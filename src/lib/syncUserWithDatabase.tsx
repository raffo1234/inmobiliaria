import { supabase } from "./supabase";

type UserSession = {
  id: string;
  email: string;
  name: string;
  image: string;
};

type Profile = {
  given_name: string;
  family_name: string;
};

export default async function syncUserWithDatabase(
  userSession: UserSession,
  profile: Profile,
) {
  const userId = userSession.id;
  const userEmail = userSession.email;
  const profileFirstName = profile.given_name;
  const profileLastName = profile.family_name;
  const userImage = userSession.image;

  try {
    const { data, error: selectError } = await supabase
      .from("user")
      .select("id, email, first_name, last_name, image_url, provider_id")
      .eq("email", userEmail)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error(
        "syncUserWithDatabase: Error checking user existence:",
        selectError,
      );
      return true;
    }

    if (data) {
      console.log(
        `syncUserWithDatabase: User with ID ${userId} already exists in custom table. Checking for updates...`,
      );
      const updates: {
        provider_id?: string;
        email?: string;
        username?: string;
        first_name?: string;
        last_name?: string;
        image_url?: string;
      } = {};

      if (userId && data.provider_id !== userId) {
        updates.provider_id = userId;
      }

      if (userEmail && data.email !== userEmail) {
        updates.email = userEmail;
      }

      if (profileFirstName && data.first_name !== profileFirstName) {
        updates.first_name = profileFirstName;
      }

      if (profileLastName && data.last_name !== profileLastName) {
        updates.last_name = profileLastName;
      }

      if (userImage && data.image_url !== userImage) {
        updates.image_url = userImage;
      }

      if (Object.keys(updates).length > 0) {
        console.log(
          `syncUserWithDatabase: Updating user ${userId} with:`,
          updates,
        );
        const { error: updateError } = await supabase
          .from("user")
          .update(updates)
          .eq("email", userEmail);

        if (updateError) {
          console.error(
            "syncUserWithDatabase: Error updating user data:",
            updateError,
          );
        } else {
          console.log(`syncUserWithDatabase: User data updated for ${userId}.`);
        }
      } else {
        console.log(
          `syncUserWithDatabase: No updates needed for user ${userId}.`,
        );
      }
    } else {
      console.log(
        `syncUserWithDatabase: User with ID ${userId} not found in custom table. Inserting new user...`,
      );

      const insertData = {
        provider_id: userId,
        provider: "google",
        email: userEmail,
        first_name: profileFirstName,
        last_name: profileLastName,
        username: userEmail,
        image_url: userImage,
        created_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase
        .from("user")
        .insert([insertData]);

      if (insertError) {
        console.error(
          "syncUserWithDatabase: Error inserting new user into custom table:",
          insertError,
        );
      } else {
        console.log(
          `syncUserWithDatabase: New user inserted into custom table with ID ${userId}.`,
        );
      }
    }
  } catch (error) {
    console.error(
      "syncUserWithDatabase: An unexpected error occurred during user sync:",
      error,
    );
    return true;
  } finally {
    return true;
  }
}

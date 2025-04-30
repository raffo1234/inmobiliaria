export const propertyQuery = `
    id,
    title,
    property_image (
      image_url
    ),
    user!property_user_id_fkey (
      id,
      email,
      name,
      image_url
    ),
    company!property_company_id_fkey (
      id,
      name,
      logo_url
    )
  `;

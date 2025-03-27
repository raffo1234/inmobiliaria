import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable(
  {
    columns: {
      id: column.text({primaryKey: true}),
      email: column.text({unique: true}),
      username: column.text({unique: true}),
      password: column.text(),
    }
  }
)

const Project = defineTable(
  {
    columns: {
      id : column.text({primaryKey: true}),
      title: column.text({unique: true}),
      description: column.text({unique: true}),
      image: column.text(),
      year: column.text(),
      userId: column.text({references: () => User.columns.id}),
      categoryId: column.text({references: () => Category.columns.id}),
    }
  }
)

const Category = defineTable(
  {
    columns: {
      id : column.text({primaryKey: true}),
      name: column.text({ unique: true}),
      description: column.text(),
    }
  }
)

// https://astro.build/db/config
export default defineDb({
  tables: {User, Project, Category}
});

<template>
  <nav>
    <RouterLink to="/">Catálogo</RouterLink>
    <RouterLink to="/items/new">Novo livro</RouterLink>
    <RouterLink to="/pokemon">Pokémon</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 12px;
  border-bottom: 1px solid #2e303a;
  margin-bottom: 16px;
}

nav a.router-link-active {
  font-weight: bold;
  color: #c084fc;
}
</style>
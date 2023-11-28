@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&family=Poppins:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;


:root {
  font-family: 'Poppins', sans-serif;
  /* line-height: 1.5; */
  font-weight: 400;

  color-scheme: light dark;
  color: #e7a56f;
  background-color: #4d494a;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --titulo: 'Nunito', sans-serif;
  --parrafo: 'Poppins', sans-serif;

  --colorCustom1: #f1b95e;
  --colorCustom2: #ff6347;
  --colorCustom3: #b2e43f;
  --colorCustom4: #333333;
  --colorCustom5: #f8f9fa;
}

a {
  font-weight: 500;
  text-decoration: inherit;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

/* h1 {
  font-size: 3.2em;
  line-height: 1.1;
} */


@media (prefers-color-scheme: light) {
  :root {
    background-color: #ffffff;
  }
}


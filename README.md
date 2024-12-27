# Random Recipe Explorer

Welcome to the **Random Recipe Explorer**! Discover random recipes from an external API and enjoy a delightful culinary experience. This modern web application is built with React and TypeScript, showcasing clean code and a seamless user interface.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Struggles and Learning](#struggles-and-learning)
7. [Mentors and Contributions](#mentors-and-contributions)
8. [License](#license)

---

## Features

- **Random Recipe Generation**: Fetch and display random recipes with ingredients, instructions, and thumbnails.
- **Responsive Design**: Fully mobile-friendly for a seamless experience across devices.
- **Loading State**: Displays a skeleton loader while fetching data.
- **Error Handling**: Robust error handling ensures graceful management of API failures.

---

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For improved code quality and maintainability.
- **Vite**: A fast build tool for smooth development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Jest**: Ensures code reliability with structured tests.

---

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/random-recipe-explorer.git
cd random-recipe-explorer
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Configure TypeScript:

Ensure that the `tsconfig.json` and `tsconfig.node.json` files are set up correctly.

#### **tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### **tsconfig.node.json**:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "composite": true,
    "noEmit": false,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

---

## Running the Application

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

Run all tests with:

```bash
npm test
```

### Example Test Code:

```typescript
import { fetchRandomRecipe } from "../../src/services/api";
import { ApiError } from "../../src/types/errors";
import { Recipe } from "../../src/types/interfaces";

global.fetch = jest.fn();

describe("API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and returns a random recipe successfully", async () => {
    const mockRecipe: Recipe = {
      /* mock data */
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: [mockRecipe] }),
    });

    const result = await fetchRandomRecipe();
    expect(result).toEqual(mockRecipe);
  });

  it("throws ApiError when API returns no meals", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null }),
    });

    await expect(fetchRandomRecipe()).rejects.toThrow(ApiError);
  });
});
```

---

## Struggles and Learning

1. **TypeScript Transition**: Converting from JavaScript to TypeScript required defining robust types like `Recipe` and `ApiResponse`. This improved type safety and made the codebase more maintainable.
2. **Error Handling**: Implemented a custom `ApiError` class for structured error management, significantly enhancing reliability.
3. **UI and Prop Typing**: Refactoring components like `RecipeCard` to enforce strict prop types helped improve clarity and debugging.
4. **Learning Curve**: Mastering advanced TypeScript features, such as generics, was challenging but highly rewarding, leading to better overall coding practices.

---

## Mentors and Contributions

This project would not have been possible without the guidance and support of my mentors:

- [**Guntur Kurniawan**](https://github.com/gunturkh): Provided invaluable insights into TypeScript best practices and helped structure the project's type definitions.
- [**Retzd Tech**](https://github.com/retzd-tech): Assisted with integrating Jest for testing and improving error handling mechanisms.

Their expertise and mentorship were instrumental in making this application robust and reliable. I am incredibly grateful for their contributions.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## 📧 Connect with Me

[![Linkedin Badge](https://img.shields.io/badge/-Andika_Safri-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/andika-safri/)
[![Instagram Badge](https://img.shields.io/badge/-Andika_Safri-purple?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/dikko_pujangga/)
[![Gmail Badge](https://img.shields.io/badge/-andika.saf3@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:andika.saf3@gmail.com)

---

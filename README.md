## Para empezar

### Prerequisitos

- NVM (recomendado para asegurar versión de Node) ver [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

  ```sh
  nvm use
  # o
  nvm use <version>
  ```

  > Si quieres automatizar el proceso, puedes crear un script siguiendo la [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)


## Gestor de paquetes

Bun (es nuestra recomendación por su eficiencia y rapidez)


- Para Linux/MacOS:
	```sh
	curl -fsSL https://bun.sh/install | bash
	```

- Para Windows:

  ```powershell
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando | Acción |
| :-- | :-- |
| `bun install` | Instalar dependencias |
| `bun run dev` | Inicia el servidor de desarrollo local en `localhost:5173` |
| `bun run build` | Construir sitio para producción en `./dist/` |
| `bun run preview` | Obtenga una vista previa de su compilación localmente, antes de implementarla |
| `bun add` | Agregar paquetes |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 🛠️ Stack

- [![next-badge]][next-url] - Vite es una herramienta de desarrollo frontend que ofrece un entorno más rápido y eficiente para proyectos web modernos. 
- [![Typescript][typescript-badge]][typescript-url] - JavaScript con sintaxis para tipos.
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - Un framework CSS orientado a utilidades para construir diseños personalizados de manera rápida.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>


## Estructura de Carpetas

El proyecto utiliza una estructura basada en **Screaming Architecture**, lo que significa que las carpetas reflejan claramente los conceptos del dominio y los módulos de negocio. Esta estructura facilita la identificación del propósito de cada módulo sin necesidad de conocer los detalles técnicos, lo cual promueve la mantenibilidad y escalabilidad del código.

Ejemplo de estructura:

```
  └── src/
      ├── assets/
      ├── modules/
      │    ├── core/
      │    │   ├── components/
      │    │   ├── design-system/
      │    │   │    └── Button.tsx
      │    │   ├── hooks/
      │    │   ├── services/
      │    │   └── utils/
      │    ├── auth/
      │    │   ├── components/
      │    │   ├── hooks/
      │    │   ├── services/
      │    │   └── utils/
      │    └── dashboard/
      │        ├── components/
      │        ├── hooks/
      │        ├── services/
      │        └── utils/
      ├── routes/
      │   └── index.tsx
      └──── main.tsx
    
```

- **`modules`**: Contiene los módulos de negocio principales del sistema, cada uno con sus componentes, hooks, servicios, y utils relacionados.
- **`core`**: Incluye elementos compartidos entre múltiples módulos, como componentes y hooks comunes.

Este enfoque te permite estructurar el código de manera más alineada con las funciones y necesidades del negocio.


[next-url]: https://vite.dev/
[next-badge]: https://img.shields.io/badge/vite.js-000000?style=for-the-badge&logo=Vite&logoColor=currentColor
[typescript-url]: https://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[tailwind-url]: https://tailwindcss.com/
[animations-url]: https://tailwindcss-animations.vercel.app/
[tailwind-badge]: https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[animations-badge]: https://img.shields.io/badge/@midudev/tailwind-animations-ff69b4?style=for-the-badge&logo=node.js&logoColor=white&color=blue

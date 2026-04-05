# Quick Start

This page gives you a guided tour of the application so you can get productive in minutes.

---

## Home Page

![Home page](../assets/screenshots/home.png)

When you first open the app you see the **Home** page. The left sidebar contains the main navigation and the top bar provides quick access to the theme toggle.

### Navigation areas

| Area | Description |
|---|---|
| **Sidebar** | Main navigation with links to all pages |
| **Top bar** | App title, breadcrumb links, and theme toggle |
| **Main content** | Page-specific content |
| **Footer** | Version, GitHub link, and technology credits |

---

## Navigating the App

The sidebar contains the following top-level sections:

| Page | Path | Description |
|---|---|---|
| Home | `/` | Welcome page with quick-action links |
| Features | `/features` | Overview of all included features and the tech stack |
| Routes | `/routes` | Manage application navigation routes (CRUD) |
| Architecture | `/architecture` | Links to companion architecture reference implementations |
| Samples | `/samples` | **Main domain use case** — full CRUD, search, export/import |
| Repositories | `/repositories` | In-memory repository list demo |
| Settings | `/settings` | Theme mode, API URL, and configuration |

---

## Your First CRUD Operation

The fastest way to experience the full feature set is through the **Samples** page.

### Step 1 — Open Samples

Click **Samples** in the sidebar or navigate to `/samples`.

### Step 2 — Configure the API (optional)

If you have the backend running locally, go to **Settings → API Setup** and set the URL to `http://localhost:8080`. Without a backend the page shows a 500 error from the API calls, but all UI controls remain functional.

### Step 3 — Create a sample

![Create Sample dialog](../assets/screenshots/create-sample-dialog.png)

1. Click **Create Sample** (top-right of the grid toolbar).
2. Fill in the **Name** field (required).
3. Optionally add a **Description**, select existing **Tags**, and toggle **Active**.
4. Click **Create**.

### Step 4 — Browse the grid

Once records exist, the DataGrid shows them with pagination controls at the bottom. You can:

- **Sort** by clicking any column header.
- **Filter** using the column menu (right-click or the filter icon).
- **Select rows** via the checkbox column.

### Step 5 — Edit or delete

Each row has an **Actions** column with three icon buttons:

| Icon | Action |
|---|---|
| 👁 View | Opens a read-only details dialog |
| ✏️ Edit | Opens the update form pre-filled with the current values |
| 🗑 Delete | Shows a confirmation dialog before deleting |

---

## Theme Switching

Click the **sun/moon icon** in the top-right corner of the app bar to toggle between light and dark mode. The preference is stored in `localStorage` and restored on next visit.

For more options navigate to **Settings → Theme Settings** where you can choose between:

- **Light only** — always light mode
- **Dark only** — always dark mode
- **Switchable** — user can toggle at any time

---

## Settings

Navigate to **Settings** in the sidebar to expand the settings sub-menu:

| Setting page | Purpose |
|---|---|
| Theme Settings | Choose light/dark/switchable variant |
| Configuration | General app configuration |
| API Setup | Set the backend base URL |

---

## Next Steps

- Read about the **[Sample Management](../features/sample-management.md)** feature in detail.
- Learn how the **[MUI DataGrid](../technical/mui-datagrid.md)** is configured.
- Explore the **[React Hook Form](../technical/react-hook-forms.md)** patterns used in this project.

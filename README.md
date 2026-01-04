# ColorfulBlog

ColorfulBlog is a vibrant, full-stack web application that allows users to create, read, update, and delete blog posts. The project features a robust RESTful API built with **FastAPI** and a modern, responsive user interface built with **React (Vite)**.

## 🚀 Live Demo

* **Frontend:** [https://tiny-raindrop-b87ee3.netlify.app/](https://tiny-raindrop-b87ee3.netlify.app/)
* **Backend API Docs:** [https://talentgrowth-test-production.up.railway.app/docs](https://talentgrowth-test-production.up.railway.app/docs)

---

## 🛠 Tech Stack

* **Backend:** Python, FastAPI, Pydantic, SQLAlchemy.
* **Frontend:** React.js, Vite, Tailwind CSS, Axios.
* **Database:** PostgreSQL on Supabase.

---

## 📋 API Structure

Based on the Swagger documentation, the API follows a standard RESTful pattern for the `Posts` resource:

Here is the updated **API Structure** section for your README, incorporating all the endpoints identified from the documentation.

---

### 📋 API Structure

The API is versioned under `/api/v1` and includes full authentication, post management, and commenting systems.

#### **Authentication**

| Method | Endpoint | Description |
| --- | --- | --- |
| **POST** | `/api/v1/auth/register` | Register a new user account. |
| **POST** | `/api/v1/auth/login` | Log in to an existing account. |
| **GET** | `/api/v1/auth/me` | Retrieve current user profile (Protected). |
| **PUT** | `/api/v1/auth/me` | Update current user profile (Protected). |
| **POST** | `/api/v1/auth/logout` | Log out the current session (Protected). |

#### **Posts**

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/v1/posts/` | Retrieve a list of all blog posts. |
| **POST** | `/api/v1/posts/` | Create a new blog post (Protected). |
| **GET** | `/api/v1/posts/{post_id}` | Get details of a specific post by ID. |
| **PUT** | `/api/v1/posts/{post_id}` | Update an existing post (Protected). |
| **DELETE** | `/api/v1/posts/{post_id}` | Remove a post from the database (Protected). |
| **GET** | `/api/v1/posts/posts/me` | Retrieve posts created by the current user (Protected). |

#### **Comments**

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/v1/posts/{post_id}/comments` | Get all comments for a specific post. |
| **POST** | `/api/v1/posts/{post_id}/comments` | Add a comment to a post (Protected). |
| **PUT** | `/api/v1/comments/{comment_id}` | Update an existing comment (Protected). |
| **DELETE** | `/api/v1/comments/{comment_id}` | Delete a specific comment (Protected). |

---

Would you like me to update the **Assumptions** section of your README to reflect these new authentication requirements?

---

## 💻 Local Setup Instructions

### Prerequisites

* Python 3.9+
* Node.js (v16+) & npm/yarn

### 1. Backend Setup (FastAPI)

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/colorful-blog.git
cd backend
```


2. **Create a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```


3. **Install dependencies:**
```bash
pip install -r requirements.txt
```


4. **Run the server:**
```bash
uvicorn main:app --reload
```


*The API will be available at `http://localhost:8000*`

### 2. Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
```bash
cd ../frontend
```


2. **Install dependencies:**
```bash
npm install
```



3. **Start the development server:**
```bash
npm run dev

```


*The site will be available at `http://localhost:5173*`

---

## 🧐 Assumptions Made

To complete this project and documentation, the following assumptions were made:

1. **Database:** It is assumed that the production app uses **PostgreSQL**. For local development, the instructions assume a standard FastAPI setup where the database is automatically initialized.
2. **Authentication:** It is assumed that the blog is currently **publicly editable** (no Auth required).
3. **Styling:** Based on the "Colorful" name and modern React standards, **Tailwind CSS** is assumed to be the primary styling framework.
4. **Profile:** No avatar upload and uses minimal information on each profile.
5. **Timestamp:** Only shows the current local day without no spefication of local time

# Local Authentication Setup

Navigate to the [GitHub Developer Settings](https://github.com/settings/developers) page. Create a new OAuth App.

List `http://localhost:3000` as your homepage URL and `http://localhost:3000/api/auth/callback/github` as your callback URL.

Copy your Client ID into the GITHUB_ID section of the .env file (reference the template). Then, generate a secret and copy it into GITHUB_SECRET.

Finally, generate a NextAuth secret by visiting [this page](https://generate-secret.vercel.app/32). Copy it into your .env, under NEXTAUTH_SECRET.

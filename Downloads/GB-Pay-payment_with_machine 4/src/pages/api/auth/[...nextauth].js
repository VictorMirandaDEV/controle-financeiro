import moment from "moment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API } from "../../../api";
const secretJWT = process.env.JWT_SECRET;
let name; 
let cpf;
let id;
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "GB Pay",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        telefone: {
          label: "cpf",
          type: "tel",
          placeholder: "jsmith@example.com",
        },
        senha: { label: "Password", type: "password" },
        // tenantKey: {
        //   label: 'Tenant Key',
        //   type: 'text',
        // },
      },
      async authorize(credentials) {
        const payload = {
          cpf: credentials.cpf,
          senha: credentials.senha,
        };

        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();
        if (!res.ok) {
          // throw new Error(user.exception);
          throw new Error("default");
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          // console.log("res",user.nome);
          name = user.nome
          cpf = user.cpf
          id = user.id

          // const nome = user.nome;
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,

  pages: {
    signIn: "/",
    signOut:"/",
    error: "/",
  },
  callbacks: {
    async session({ session, token }) {
      // console.log("olha o Nome aqui: ",name);

      session.accessToken = token.accessToken;
      // session.expires=token.exp;
      session.user.name =token.name;
      session.user.cpf =token.cpf;
      session.user.image =token.image;
      session.user.id =token.id;
      session.user.paf =token.paf;
      session.user.atendente =token.atendente;

      return session;
    },
    async jwt({ token, user }) {
      console.log(user)

      if (user) {

        token.accessToken = user.accessToken;
        token.name = user.nome;
        token.cpf = user.cpf;
        token.image = user.id;
        token.id = user.id;
        token.paf = user.paf;
        token.atendente = user.atendente;
      }


      return token;
    },
    error: async (error, redirect, redirectUrl) => {
      // console.log("NEW Error callback: ", redirectUrl);

      return redirect(`https://google.com.br`);
    },
  },
  session: {
    jwt: true,
    strategy: "jwt",
    // get: async (session, decryptedToken) => {
    //   session.token = await jwt.encode({
    //     secret:  process.env.JWT_SECRET ,
    //     token: decryptedToken,
    //     maxAge: 24 * 60 * 60,
    //   });
    //   return session;
    // },
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 24 * 60 * 60, // 1 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    //   encode(user){return user.accessToken}
    // async encode({
    //    token,
    //    secretJWT,
    // }): {
    // return a custom encoded JWT string
    //   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});

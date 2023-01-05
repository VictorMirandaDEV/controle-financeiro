import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      cpf: string,
      id: number,
      atendente: boolean,
      paf?:{
        id_paf?: number,
        paf_name?: string,
        endereco?: string,
      }

    }& DefaultSession["user"]
  }
}
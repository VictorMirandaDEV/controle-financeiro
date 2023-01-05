import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isCPF, isCNPJ } from "validation-br";
import valid from "card-validator";
import moment from "moment";
import { Boleto } from "broleto";
import { getBoletoByCode } from "../Components/Scanner/boleto";

yup.addMethod(yup.string, "creditCard", function (errorMessage) {
  return this.test(`test-credit-card`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      valid.number(value).isValid ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "boleto", function (errorMessage) {
  return this.test("test-boleto", errorMessage, async function (value) {
    const { path, createError } = this;

    const info = getBoletoByCode(value);

    return info?.valido.sucesso || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, "creditCardLength", function (errorMessage) {
  return this.test(`test-card-length`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      (value && value.length === 16) ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "cpf", function (errorMessage) {
  return this.test(`test-cpf`, errorMessage, function (value) {
    const { path, createError } = this;

    return isCPF(value) || createError({ path, message: errorMessage });
  });
});
yup.addMethod(yup.string, "cpfCnpj", function (errorMessage) {
  return this.test(`test-cpf`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      isCPF(value) ||
      isCNPJ(value) ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "validDate", function (errorMessage) {
  return this.test("test-validDate", errorMessage, function (value) {
    const { path, createError } = this;

    const a = moment(value, "MM/YY");
    const b = moment();

    return (
      a.diff(b, "months") >= 0 || createError({ path, message: errorMessage })
    );
  });
});

export const updateUserSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Insira um E-mail Valido")
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    telefone: yup
      .string()
      .min(15, "No minimo 15 caracteres")
      .max(16, "No máximo 16 caracteres")
      .required("Este campo é obrigatório"),
  })
  .required();

export const recoveryUserSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Insira um E-mail Valido")
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .max(120, "No máximo 120 caracteres")
      .required("Este campo é obrigatório"),
    senha2: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .oneOf([yup.ref("senha"), null], "As senhas não podem ser diferentes")
      .required("Este campo é obrigatório"),
  })
  .required();

export const userSchema = yup
  .object({
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .max(120, "No máximo 120 caracteres")
      .required("Este campo é obrigatório"),
  })
  .required();

export const boletoSchema = yup
  .object({
    boleto: yup
      .string()
      .boleto("Boleto Inválido")
      .required("Este campo é obrigatório"),
    description: yup.string().required("Este campo é obrigatório"),
  })
  .required();

export const tokenSchema = yup.object({
  cpf: yup
    .string()
    .cpf("Não é um CPF valido")
    .required("Este campo é obrigatório"),
  senha: yup
    .string()
    .min(4, "No minimo 4 caracteres")
    .max(120, "No máximo 120 caracteres")
    .required("Este campo é obrigatório"),
});
// .required();
//   token: yup
//     .string("Token Inválido")
//     .required("Este campo é obrigatório")
//     .min(2, "No minimo 6 caracteres"),

export const cardCodeSchema = yup
  .object({
    cardCode: yup
      .string()
      .required("Este campo é obrigatório")
      .min(6, "No minimo 6 caracteres")
      .max(6, "No máximo 6 caracteres"),
  })
  .required();

export const cadastroAtendenteSchema = yup
  .object({
    nome: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Apenas Letras neste campo")
      .max(255, "No máximo 255 caracteres"),
    sobrenome: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Apenas Letras neste campo")
      .max(255, "No máximo 255 caracteres"),
    email: yup
      .string()
      .email("Insira um E-mail Valido")
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    endereco: yup
      .string()
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    telefone: yup
      .string()
      .min(15, "No minimo 15 caracteres")
      .max(16, "No máximo 16 caracteres")
      .required("Este campo é obrigatório"),
    paf: yup.number("Selecione um PAFs").required("Selecione um PAFs"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .max(120, "No máximo 120 caracteres")
      .required("Este campo é obrigatório"),
    senha2: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .oneOf([yup.ref("senha"), null], "As senhas não podem ser diferentes")
      .required("Este campo é obrigatório"),
    cep: yup.string().required("Este campo é obrigatório"),
    bairro: yup.string().required("Este campo é obrigatório"),
    estado: yup.string().required("Este campo é obrigatório").default("AM"),
    cidade: yup.string().required("Este campo é obrigatório"),
    numero: yup.string().required("Este campo é obrigatório"),
    complemento: yup.string(),
  })
  .required();

export const cadastroSchema = yup
  .object({
    nome: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Apenas Letras neste campo")
      .max(255, "No máximo 255 caracteres"),
    sobrenome: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Apenas Letras neste campo")
      .max(255, "No máximo 255 caracteres"),
    email: yup
      .string()
      .email("Insira um E-mail Valido")
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    cpf: yup
      .string()
      .cpf("Não é um CPF valido")
      .required("Este campo é obrigatório"),
    endereco: yup
      .string()
      .max(255, "No máximo 255 caracteres")
      .required("Este campo é obrigatório"),
    telefone: yup
      .string()
      .min(15, "No minimo 15 caracteres")
      .max(16, "No máximo 16 caracteres")
      .required("Este campo é obrigatório"),
    birhDate: yup
      .date()
      .required("Este campo é obrigatório")
      .min(new Date("1900-01-01"), "Data inválida")
      .max(new Date(), "Data inválida"),
    motherName: yup
      .string()
      .required("Este campo é obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Apenas Letras neste campo")
      .max(255, "No máximo 255 caracteres"),
    senha: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .max(120, "No máximo 120 caracteres")
      .required("Este campo é obrigatório"),
    senha2: yup
      .string()
      .min(4, "No minimo 4 caracteres")
      .oneOf([yup.ref("senha"), null], "As senhas não podem ser diferentes")
      .required("Este campo é obrigatório"),
    cep: yup.string().required("Este campo é obrigatório"),
    bairro: yup.string().required("Este campo é obrigatório"),
    estado: yup.string().required("Este campo é obrigatório").default("AM"),
    cidade: yup.string().required("Este campo é obrigatório"),
    numero: yup.string().required("Este campo é obrigatório"),
    complemento: yup.string(),
  })
  .required();

export const cartaoCreditoEnderecoSchema = yup.object({
  installments: yup.number().default(1),
  // creditCard: yup
  //   .string()
  //   .creditCard("Cartão de crédito invalido")
  //   .required("Este campo é obrigatório"),
  // validade: yup
  //   .string()
  //   .matches(
  //     /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
  //     "Informe uma data valida"
  //   )
  //   .validDate("Informe uma data valida")
  //   .min(5)
  //   .required("Este campo é obrigatório"),
  // cpfCnpj: yup
  //   .string()
  //   .cpfCnpj("Não é um documento valido")
  //   .required("Este campo é obrigatório"),
  // securityCode: yup
  //   .string()
  //   .min(3, "No minimo 3 digitos")
  //   .max(4, "no maximo 4 digitos")
  //   .required("Este campo é obrigatório"),
  // fullName: yup
  //   .string()
  //   .required("Este campo é obrigatório")
  //   .matches(/^[a-zA-Z\s]+\s+[a-zA-Z]+$/, "Apenas Letras neste campo")
  //   .max(255, "No máximo 255 caracteres")
  //   .min(3, "No minimo 3 caracteres"),
});

export const AddressSchema = yup.object({
  cep: yup.string().required("Este campo é obrigatório"),
  bairro: yup.string().required("Este campo é obrigatório"),
  estado: yup.string().required("Este campo é obrigatório").default("AM"),
  cidade: yup.string().required("Este campo é obrigatório"),
  endereco: yup.string().required("Este campo é obrigatório"),
  numero: yup.string().required("Este campo é obrigatório"),
  complemento: yup.string(),
});

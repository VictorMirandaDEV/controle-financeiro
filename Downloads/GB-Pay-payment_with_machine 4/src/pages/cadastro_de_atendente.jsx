import React, { useEffect, useState } from "react";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import axios from "axios";
import { useRouter } from "next/router";
import api, { API } from "../api";
import { cadastroAtendenteSchema } from "../utils/validation";
import { Controller, useForm } from "react-hook-form";
import { DropdownAtendente, Input, Mask } from "../Components/CustomComponents";
import { Logo } from "../Components/Icons/logo";

import { useAddress } from "../context/addressContext";
export default function Cadastro({ip}) {
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cadastroAtendenteSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [paf, setPaf] = useState([]);
  const [id_paf, setIdPaf] = useState();
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");

  const router = useRouter();
  const { addressData, setAddressData } = useAddress();

  const label = "block font-Tw py-1  text-lg";
  const labelEndereco = "w-full mx-0  flex-1 svelte-1l8159u";
  let cepLength = cep.replaceAll(" ", "").replaceAll("-", "").length;

  useEffect(() => {
    const getPaf = async () => {
      await api.get("/paf").then((res) => {
        setPaf(res.data);
        // console.log(res.data);
      });
    }
    getPaf();
  }, []);

  useEffect(() => {
    if (!addressData) {
      return;
    }
    setValue("bairro", addressData?.bairro, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("endereco", addressData?.endereco, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("cidade", addressData?.cidade, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("estado", addressData?.estado, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("complemento", addressData?.complemento, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("numero", addressData?.numero, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("cep", addressData?.cep, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setBairro(addressData?.bairro);
    setEndereco(addressData?.endereco);
    setComplemento(addressData?.complemento);
    setCidade(addressData?.cidade);
    setEstado(addressData?.estado);
    setNumero(addressData?.numero);
    setCep(addressData?.cep);
  }, [addressData, setValue]);

  useEffect(() => {
    const handleCEP = async () => {
      if (cepLength == 0) {
        return;
      }
      const info = await axios.get(
        `https://ws.apicep.com/cep.json?code=${cep}`,
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );
      setValue("bairro", info.data.district, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("endereco", info.data.address, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("cidade", info.data.city, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("estado", info.data.state, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setBairro(info.data.district);
      setEndereco(info.data.address);
      setCidade(info.data.city);
      setEstado(info.data.state);
    };
    handleCEP();
  }, [cepLength >= 8]);

  let options = paf.map((p) => {
    return {
      value: p.id_paf,
      label: p.paf_name,
    };
  }
  );


  // console.log(watch("paf"));
  const handleCadastro = async (data) => {

    const isValid = await cadastroAtendenteSchema.isValid(data);

    if (isValid) {
      try {
        await axios
          .post(
            `${API}/auth/`,
            {
              nome: data.nome,
              sobrenome: data.sobrenome,
              email: data.email,
              endereco: data.endereco,
              telefone: data.telefone,
              motherName: data.motherName,
              birhDate: data.birhDate,
              role: 0,
              cep: data.cep,
              bairro: data.bairro,
              cidade: data.cidade,
              uf: data.estado,
              numero: data.numero,
              complemento: data.complemento,
              cpf: data.cpf
                .replaceAll(".", "")
                .replaceAll("-", "")
                .replaceAll("/", ""),
              senha: data.senha,
              atendente: true,
              paf: {
                id_paf: data.paf
              },
              ip,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
          });
      } catch (error) {
        // console.error(error);
      }
    }
  };

  const onChange = () => {
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <Logo />

        <form onSubmit={handleSubmit(handleCadastro)}>
          <div className="mt-4">
            <Input
              onChange={onChange}
              type="text"
              nome="nome"
              label="Nome"
              register={register}
              message={errors.nome?.message}
            />
            <Input
              onChange={onChange}
              type="text"
              nome="sobrenome"
              label="Sobrenome"
              register={register}
              message={errors.sobrenome?.message}
            />
            <Input
              onChange={onChange}
              type="email"
              nome="email"
              label="E-mail"
              register={register}
              message={errors.email?.message}
            />
               <Input
              onChange={onChange}
              type="date"
              nome="birhDate"
              label="Data de nascimento"
              register={register}
              message={errors.birhDate?.message}
            />
            <Input
              onChange={onChange}
              type="text"
              nome="motherName"
              label="Nome da mãe"
              register={register}
              message={errors.motherName?.message}
            />
            <Mask
              label="Cep"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                errors.cep?.message ? "border-red-700" : ""
              }`}
              nome="cep"
              onChange={(e) => {
                setCep(e.target.value);
              }}
              format="#####-###"
              register={register}
              controle={control}
              message={errors.cep?.message}
            />

            <Input
              nome="bairro"
              label="Bairro"
              register={register}
              onChange={(e) => setBairro(e.target.value)}
              message={errors.bairro?.message}
            />
            <Input
              nome="cidade"
              label="Cidade"
              register={register}
              onChange={(e) => setCidade(e.target.value)}
              message={errors.cidade?.message}
            />
            <div className="flex  flex-row">
              <div className={labelEndereco}>
                <label className={label + ""} htmlFor="Descrição (opicional)">
                  Estado
                </label>
                <div className="">
                  <select
                    id="estado"
                    name="estado"
                    value={estado}
                    {...register("estado", { required: true })}
                    onChange={(e) => setEstado(e.target.value)}
                    className={
                      "w-full px-4 py-[10px] mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    }
                  >
                    <option value="">Selecione um estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    <option value="EX">Estrangeiro</option>
                  </select>
                </div>
                <span className="text-xs text-red-600">
                  {errors.estado?.message}
                </span>
              </div>
            </div>
            <Input
              onChange={onChange}
              type="text"
              nome="endereco"
              label="Logradouro"
              register={register}
              message={errors.endereco?.message}
            />
            <Input
              nome="numero"
              label="Número"
              register={register}
              onChange={(e) => setNumero(e.target.value)}
              message={errors.numero?.message}
            />
            <Input
              nome="complemento"
              label="Complemento"
              register={register}
              onChange={(e) => setComplemento(e.target.value)}
              message={errors.complemento?.message}
            />
            <Mask
              onChange={onChange}
              type="text"
              nome="telefone"
              label="Telefone"
              register={register}
              format="(##) #####-####"
              controle={control}
              message={errors.telefone?.message}
            />
            <Mask
              controle={control}
              onChange={onChange}
              format="###.###.###-##"
              type="text"
              nome="cpf"
              label="CPF"
              register={register}
              message={errors.cpf?.message}
            />
            <Controller
              control={control}
              // defaultValue={options[0]?.value}
              nome="paf"
              {...register("paf", { required: true,
              onChange: e=>setIdPaf(e.target.value)
              })}
              render={({ field: { onChange, name, value } }) => (
                <DropdownAtendente
                label="PAFs"
                  options={options}
                  name={name}
                  value={value}
                  onChange={onChange}
                  message={errors.paf?.message}
                />
              )}


            />
            <Input
              onChange={onChange}
              type="password"
              nome="senha"
              label="Senha"
              register={register}
              message={errors.senha?.message}
            />
            <Input
              onChange={onChange}
              type="password"
              nome="senha2"
              label="Confirmar a Senha"
              register={register}
              message={errors.senha2?.message}
            />

            <div className="flex items-baseline justify-center">
              <button
                className=" w-full px-0 py-2 mt-4 text-white text-3xl bg-button-submit rounded-lg hover:bg-gray font-TwBold "
                type="submit"
              >
                Cadastrar
              </button>
            </div>
            <div className="flex items-baseline justify-center">
              <button
                onClick={() => { router.push("/") }}
                className=" w-full px-0 py-2 mt-4 text-white text-3xl bg-button-submit rounded-lg hover:bg-gray font-TwBold "
                type="button"
              >
                Voltar
              </button>
            </div>

            <span className="text-xs text-red-600">
              {errorMessage ? "Usuario já está cadastrado" : ""}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const forwarded = req.headers["x-forwarded-for"]
  // const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  const ip =  req.connection.remoteAddress
  console.log(ip);
  return {
    props: {
      ip,
    },
  }
}
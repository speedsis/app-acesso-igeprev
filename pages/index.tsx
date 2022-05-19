import axios from 'axios'
import type { NextPage } from 'next'
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import SVG from 'react-inlinesvg'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
interface IMsg {
  user: string
  msg: string
}

// create random user
const user = 'User_' + String(new Date().getTime()).substr(-3)

const myId = uuidv4()

const LoginPage: NextPage = () => {
  const router = useRouter()

  const [response, setResponse] = useState('')
  const [showMe, setShowMe] = useState(false)

  const [autenticated, setAutenticated] = useState(false)

  const inputRef = useRef() as MutableRefObject<any>

  const socket = useMemo<SocketIOClient.Socket>(
    () => io('http://159.65.235.241:3003'),
    [],
  )

  useEffect(() => {
    socket.on(
      'authenticated-check',
      (content: { message: string; name: string; status: boolean }) => {
        console.log('RESPOSTA DE MENSAGEM', content)

        if (content.status) {
          setShowMe(false)
          setAutenticated(content.status)

          setTimeout(() => {
            router.push('/home')
          }, 2000)
        }
      },
    )

    socket.on('connect', () => {
      console.log('[IO] Connect => A new connection has been established')
    })
  }, [socket])

  function gerarQrCode() {
    // const userEmail = inputRef.current.value

    setShowMe(!showMe)

    if (!showMe) {
      getQrcode()
      // socket.emit('authenticated', {
      //   id: socket.id,
      //   message: userEmail,
      // })
    }
  }

  const getQrcode = async () => {
    const email = inputRef.current.value

    console.log(`passando email qrcode ${email} `)

    try {
      const res = await axios.get('api/qrcode/', {
        params: { email },
      })

      setResponse(res.data)

      console.log(`resposta qrcode ${response} `)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   getQrcode()
  // }, [])

  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-300 i justify-around items-center">
        <div className="relative z-20 flex w-full min-h-screen px-5 pt-20 mx-auto sm:px-12 sm:h-screen max-w-7xl sm:pt-0 lg:px-0">
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
            <div className="">
              <div className="flex flex-col items-start justify-center w-full h-full pb-20">
                <div className="relative w-full mt-10 lg:pl-10">
                  <div className="flex items-start justify-center rounded-lg w-120 h-120 sm:rounded-xl">
                    <img src="/images/logo-eq-wp.png" />
                  </div>
                  <h1
                    className="relative z-0 w-full max-w-md py-2 text-4xl font-black text-left text-gray-200 sm:py-5 sm:text-6xl"
                    data-unsp-sanitized="clean"
                  >
                    IGEPREV PA
                  </h1>
                </div>

                <div className="flex flex-col items-start my-4 text-left lg:pl-10">
                  <p className="max-w-md mb-10 text-base font-light text-gray-200 sm:text-lg lg:text-xl dark:text-dark-200">
                    Autentique usuários com mais segurança Nossa tecnologia de
                    reconhecimento facial reduz o risco de fraudes por
                    personificação. Através da comparação de uma selfie e a foto
                    usada no documento, nós confirmamos que seus usuários são
                    quem realmente eles dizem ser.
                  </p>

                  {/* <div className="relative flex flex-col items-center justify-start w-full space-y-5 sm:w-auto lg:space-y-0 lg:space-x-5 lg:flex-row">
                  <button
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white text-blue-600 transition duration-150 ease-in-out border border-transparent rounded-lg sm:w-auto sm:rounded-full bg-blue-50 xl:px-10 hover:bg-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue md:py-4 xl:text-xl"
                    onClick={() => getQrcode()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                    Gerar QRCode
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="px-20">
            <div className="flex flex-col items-start justify-center w-full h-full pb-20">
              <SVG src={response} />
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Ola novamente!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Bem vindo de volta
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              ref={inputRef}
              placeholder="Endereço de email"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name=""
              id=""
              placeholder="Senha"
            />
          </div>

          <button
            type="button"
            onClick={() => gerarQrCode()}
            // onClick={(e) => toggle(e)}
            className=" w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>

          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            recuperar senha?
          </span>

          <div
            className="px-20 pb-20"
            style={{
              display: autenticated ? 'block' : 'none',
            }}
          >
            <div className="flex items-start justify-center rounded-lg w-120 h-120 sm:rounded-xl">
              <img src="/images/check.gif" />
            </div>

            <div className="flex items-start justify-center rounded-lg w-120 h-120 sm:rounded-xl">
              <span className="text-sm justify-center items-center ml-2 hover:text-blue-500 cursor-pointer">
                Autenticado com sucesso!
              </span>
            </div>
          </div>
        </form>
        <div
          className="px-20 pb-20"
          style={{
            display: showMe ? 'block' : 'none',
          }}
        >
          <SVG src={response} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage

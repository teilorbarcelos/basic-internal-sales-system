import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import Button1 from '../../components/Button1'

interface ICredentials {
  login: string
  password: string
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm()

  async function signIn(data: ICredentials) {

    // await login(data)
    console.log(data)

  }

  return (
    <>
      <Head>
        <title>Login de funcionário</title>
        <meta name="description" content="Página de login para funcionários" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.login}>
        <div className={styles.loginBox}>
          <form onSubmit={handleSubmit(signIn)} >
            <h2>Faça Login</h2>
            <div>
              <label htmlFor="login">Login: </label>
              <input
                {...register('login')}
                id="login"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">Senha: </label>
              <input
                {...register('password')}
                id="password"
                type="password"
              />
            </div>
            <div>
              <Button1 title="Entrar" />
            </div>
            <p><Link href="/"><a>Voltar para o site</a></Link></p>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login

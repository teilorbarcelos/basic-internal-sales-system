import styles from './styles.module.css'

interface Props {
  title: string
}

export default function Button1({ title }: Props) {
  return (
    <button className={styles.button1} type="submit">{title}</button>
  )
}
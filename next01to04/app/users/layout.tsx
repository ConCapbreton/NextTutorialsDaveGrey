import styles from './styles.module.css'

function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>About Nav</nav>
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}

export default AboutLayout

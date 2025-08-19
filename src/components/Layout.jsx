export default function Layout(props) {
  const { children } = props;
  const header = (
    <header>
      <h1 className="text-gradient">The SetGo</h1>
      <p>
        <strong>Plan & Crush Your Gym Goals</strong>
      </p>
    </header>
  );
  
  const footer = (
    <footer>
      <p>
        Built by{" "}
        <a target="_blank" href="/Portfolio/index.html">
          Ankit Kumar Sharma
        </a>
        <br />
        Styled by{" "}
        <a target="_blank" href="https://fantacss.smoljames.com">
          FantaCSS
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}

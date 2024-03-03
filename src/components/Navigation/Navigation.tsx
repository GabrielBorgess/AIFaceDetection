import './Navigation.css'

const Navigation = () => {
  return (
    <div className="p-12 flex justify-between font-semibold">
      <div><img src="./marteloLogo.png" id="logo" alt="LOGO" className="fixed mix-blend-darken" title="Fancy hammerhead shark Logo"/></div>
      <div className="cursor-pointer">Entrar</div>
    </div>
  )
}

export default Navigation
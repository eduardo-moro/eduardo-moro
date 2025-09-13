import { useEffect, useState } from "react"

interface IntroProps {
  className?: string
}

export default function Blog({ className = "" }: IntroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <></>
    )
  }

  return (
    <div className={`select-none font-sans ${className}  h-screen`}>
        <div className="flex flex-col h-screen py-12">
          <h3 className="text-xl text-slate-400" id="lastPost">
            <span>broker://Tabnews/</span>
            <a><span className="text-[var(--foreground)]">eduardomoro/</span></a><br/>
            <a><span className="text-[var(--foreground)]">o ultimo cacareco de mesa que voce vai comprar como dev</span></a>
          </h3>
          <div className="max-h-[80dvh] overflow-y-scroll">
            <h4 className="text-lg mb-2 mt-8">
              Uma Constatação delirante: Programadores gostam de tecnologia
            </h4>
            <p>Antes mesmo da época do boom da pandemia, eu noto que muitos programadores tem algo em comum: nós gostamos de cacarecos tecnológicos, afinal, gostamos de tecnologia, e em algum momento até aquele amigo que paga de minimalista, vai ter umas bobeiras pra colocar em uma prateleira pra dar um certo ár de cyberpunk. (ah, só pontuando: aliexpress sempre tem umas promos, comprei por menos de 30 reais com as taxas)</p>
            <h4 className="text-lg mb-2 mt-8">
              O cacareco
            </h4>
            <p>Com essa idéia, que pensei em divulgar aqui um aparelinho muito massa que encontrei nessas comprinhas pela aliexpress, uma <a>"mini tv"</a>, que possui um esp8266 e já vem com um "comunicador UART", permitindo que enviemos código diretamente para ele. O dispositivo já tem wifi, tem um display, é um pacote completo para quem quer começar a brincar com esse universo de esp32, IoT, arduino afins. Não é atoa que arduino é utilizado em projetos de robótica em colégios, é algo que realmente trás uma diversão.</p>
            <h4 className="text-lg mb-2 mt-8">
              Pavimentando o caminho
            </h4>
            <p>"Okay, comprei o cacareco, e agora? é só abrir o vs code, escrever código C e dar run?"</p>
            <p>Bom, é claro que não estou aqui apenas para divulgar um brinquedo aleatório da aliexpress, também estou aqui para te mostrar o projeto que iniciei:</p>
            <br />
            <p><a>Firmware para GeekMagic paralelo | Github | eduardo-moro</a></p>
            <br />
            <p>Este meu pequeno projeto, já trás uma base de código bem sólida para expansões, o sistema inicia buscando suas redes wifi conhecidas, para sempre estar conectado, trás a criação de uma rede AP com um DNS configurado, para trazer facilidade no pareamento do dispositivo ao wifi, ou seja, nada de ficar conectando manualmente ao wifi dele, para então entrar em algum ip aleatório no navegador para poder fazer a configuração, como algumas empresas meio inexperientes no ramo de IoT acabam fazendo as vezes (sem farpas aqui). O projeto também possui temporizador, e te mostra como criar uma interface para que você possa interagir com o disposivo, já que ele vem sem nenhum botão, touch, interface web, nada.</p>
            <br />
            <p>Se achou interessante e tiver dúvidas sobre o projeto, o dispositivo, ou a linguagem, te encontro nos comentários, se ver que há interesse pelo projeto, já estou pensando em montar um post um pouco mais técnico sobre como buscar referências e como trabalhar com este tipo de dispositivo.</p>
            <br />
            <p>O projeto ainda está com algumas idéias no meu caderninho, quem sabe, eu vou trazendo atualizações, até mais!</p>
            <br />
            <p><a href="">Projeto no github</a></p>
            <p><a href="">Issue que me ajudou tecnicamente com o aparelho</a></p>
            <p><a href="">Vamos nos conectar!</a></p>
            <p className="text-2xl my-12 text-center">fim do artigo</p>
            <hr/>
          </div>
        </div>
    </div>
  )
}
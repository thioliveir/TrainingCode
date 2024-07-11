// bibliotecas e códigos de terceiros
const formatador = (data) => {
    return {
      dia: {
        numerico: dayjs(data).format('DD'),
        semana: {
          curto: dayjs(data).format('ddd'),
          longo: dayjs(data).format('dddd'),
        }
      },
      mes: dayjs(data).format('MMMM'),
      hora: dayjs(data).format('HH:mm')
    }
}
  
// object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}
  
// lista, array, vetor []
let atividades = [
    atividade,
    {
      nome: 'Academia em grupo',
      data: new Date("2024-07-09 12:00"),
      finalizada: false
    },
    {
      nome: 'Gamming session',
      data: new Date("2024-07-09 16:00"),
      finalizada: true
    },
]
  
// atividades = []
  
// arrow function
const criarItemDeAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `
  
    if(atividade.finalizada) {
      input += 'checked'
    }
   
    input += '>'
  
    const formatar = formatador(atividade.data);
  
    return `
    <div class="bg-gray">
      ${input}
  
      <div>
        <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.49996 9.99996L9.16663 11.6666L12.5 8.33329M18.3333 9.99996C18.3333 14.6023 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6023 1.66663 9.99996C1.66663 5.39759 5.39759 1.66663 9.99996 1.66663C14.6023 1.66663 18.3333 5.39759 18.3333 9.99996Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.41664 1.8183C9.46249 1.6159 10.5374 1.6159 11.5833 1.8183M11.5833 18.1816C10.5374 18.384 9.46249 18.384 8.41664 18.1816M14.6741 3.1008C15.5587 3.70016 16.3197 4.46403 16.9158 5.3508M1.8183 11.5833C1.6159 10.5374 1.6159 9.46249 1.8183 8.41664M16.8991 14.6741C16.2998 15.5587 15.5359 16.3197 14.6491 16.9158M18.1816 8.41664C18.384 9.46249 18.384 10.5374 18.1816 11.5833M3.1008 5.3258C3.70016 4.44124 4.46403 3.6802 5.3508 3.08414M5.3258 16.8991C4.44124 16.2998 3.6802 15.5359 3.08414 14.6491" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${atividade.nome}</span>
      </div>
  
      <time class="short">
        ${formatar.dia.semana.curto}.
        ${formatar.dia.numerico} <br>
        ${formatar.hora}
      </time>
  
      <time class="full">
        ${formatar.dia.semana.longo}, 
        dia ${formatar.dia.numerico}
        de ${formatar.mes} 
        às ${formatar.hora}h
      </time>
    </div>
    `
}
  
const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''
  
    // verificar se a minha lista está vazia
    if(atividades.length == 0) {
      section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
      return
    }
  
    for(let atividade of atividades) {
      section.innerHTML += criarItemDeAtividade(atividade)
    }
  
}
atualizarListaDeAtividades()
  
  
const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)
  
    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`
  
    const novaAtividade = {
      nome,
      data,
      finalizada: false
    }
  
    const atividadeExiste = atividades.find((atividade) => {
      return atividade.data == novaAtividade.data
    })
  
    if(atividadeExiste) {
      return alert('Dia/Hora não disponível')
    }
  
    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}
  
const criarDiasSelecao = () => {
    const dias = [
      '2024-02-28',
      '2024-02-29',
      '2024-03-01',
      '2024-03-02',
      '2024-03-03',
    ]
  
    let diasSelecao = ''
  
    for(let dia of dias) {
      const formatar = formatador(dia)
      const diaFormatado = `
      ${formatar.dia.numerico} de 
      ${formatar.mes}
      `
      diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
      `
    }
  
    document
    .querySelector('select[name="dia"]')
    .innerHTML = diasSelecao
  
}
criarDiasSelecao()
  
  
const criarHorasSelecao = () => {
    let horasDisponiveis = ''
  
    for(let i = 6; i < 23; i++) {
      const hora = String(i).padStart(2, '0')
      horasDisponiveis += `
      <option value="${hora}:00">${hora}:00</option>`
      horasDisponiveis += `
      <option value="${hora}:30">${hora}:30</option>`
    }
  
    document
    .querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}
criarHorasSelecao()
  
const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value
  
    const atividade = atividades.find((atividade) => {
      return atividade.data == dataDesteInput
    })
  
    if(!atividade) {
      return
    }
  
    atividade.finalizada = !atividade.finalizada
}
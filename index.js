const axios = require("axios")

const fetch = async () => {
  return await axios.get("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
}

const filter = electionData => {
  return electionData.cand.map(cand => {
    return {
      "Nome": cand.nm,
      "Número Votos Válidos": cand.vap,
      "Porcentagem Votos Válidos": cand.pvap.concat("%")
    }
  })
}

const executeEvery = interval => {
  setInterval(async () => {
    let data
    try {
      data = await fetch()
    } catch(err) {}
    console.clear()
    console.table(filter(data.data))
    console.log(`Atualizado em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`)
  }, interval)
}

executeEvery(3000)
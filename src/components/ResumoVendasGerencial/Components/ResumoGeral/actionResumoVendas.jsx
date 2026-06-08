import React, { Fragment, useEffect, useState } from "react"
import { ResultadoResumo } from "../../Components/ResumoCards/ResultadoResumo"
import { formatMoeda } from "../../../../utils/formatMoeda"
import { toFloat } from "../../../../utils/toFloat"
import { FaCashRegister, FaRegLightbulb, FaRegMoneyBillAlt } from "react-icons/fa"
import { MdOutlinePayment } from "react-icons/md"
import { BsGem } from "react-icons/bs"
import { getDataAtual, getDataAtualMesAnoAnterior, getDataDiaMesAnoAnterior, getDataPrimeiroDiaMes, getHoraAtual, mesAno, mesAnoAnterior } from "../../../../utils/dataAtual"
import { ActionListaVendasTesoura } from "./actionListaVendasTesoura"
import { ActionListaVendasFreecenter } from "./actionListaVendasFreecenter"
import { ActionListaVendasMagazine } from "./actionListaVendasMagazine"
import { useQuery } from "react-query"
import { get } from "../../../../api/funcRequest"
import { IoIosSettings, IoMdRefresh } from "react-icons/io"
import Swal from "sweetalert2"
import { ButtonType } from "../../../Buttons/ButtonType"
import { formatarPorcentagem } from "../../../../utils/formatarPorcentagem"
import { dataFormatada } from "../../../../utils/dataFormatada"

export const ActionResumoVendas = () => {
  const [dataPesquisa, setDataPesquisa] = useState('')
  const [dataPesquisaMagazine, setDataPesquisaMagazine] = useState('')
  const [dataPesquisaFreecenter, setDataPesquisaFreecenter] = useState('')
  const [dataAno, setDataAno] = useState('')
  const [dataAnoAnterior, setDataAnoAnterior] = useState('')
  const [dataPesquisaAnoAnterior, setDataPesquisaAnoAnterior] = useState('')
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [dataPrimeiroDia, setDataPrimeiroDia] = useState('')
  const [dataAtualDoAnoPassado, setDataAtualDoAnoPassado] = useState('')
  const [tempoAtualizacao, setTempoAtualizacao] = useState(60000);
  const [hora, setHora] = useState('');

  useEffect(() => {
    const dataAtual = getDataAtual();
    const horaAtual = getHoraAtual();
    const mesAtual = mesAno()
    const anoAnterior = mesAnoAnterior()
    const anoAnteriorPesquisa = getDataDiaMesAnoAnterior()
    const primeiroDiaMes = getDataPrimeiroDiaMes();
    const dataAtualAnoAnterior = getDataAtualMesAnoAnterior();
    setDataAtualDoAnoPassado(dataAtualAnoAnterior)
    setDataPesquisa(dataAtual);
    setDataPesquisaMagazine(dataAtual);
    setDataPesquisaFreecenter(dataAtual);
    setDataPesquisaInicio(dataAtual);
    setDataPesquisaFim(dataAtual);
    setDataAnoAnterior(anoAnterior);
    setDataAno(mesAtual);
    setDataPesquisaAnoAnterior(anoAnteriorPesquisa);
    setDataPrimeiroDia(primeiroDiaMes);

    setHora(getHoraAtual());
    const intervalId = setInterval(() => {
      setHora(getHoraAtual());
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);


  const AlterarTempoAtualizacao = () => {
    Swal.fire({
      title: 'Deseja alterar o tempo de atualização automática dos dados do dashboard?',
      text: 'Informe o tempo em minutos para atualizar os dados automaticamente. O tempo atual é de 1 minutos.',
      input: 'number',
      inputValue: tempoAtualizacao / 60000,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Alterar',
      showLoaderOnConfirm: true,
      preConfirm: (tempo) => {
        tempo = tempo * 60000
        setTempoAtualizacao(tempo);
        return tempo;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Tempo de atualização alterado!',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    })
  };

  const { data: dadosTotalMes = [],
    error: errorTotalMes,
    isLoading: isLoadingTotalMes, refetch: refetchTotalMes } = useQuery(
      ['vendas-total-mes', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-mes?dataPesquisaInicio=${dataPrimeiroDia}&dataPesquisaFim=${dataPesquisaFim}&horaFinal=${hora}`);

        return response.data;
      },
      {
        enabled: Boolean(dataPrimeiroDia && dataPesquisaFim && hora), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const dadosTotalMesAtual = dadosTotalMes.map((item) => {
    return {
      VALORTOTALMES: item.VALORTOTALMES
    }
  })

  const { data: dadosTotalAnoMesAnterior = [],
    error: errorTotalAnoMesAnterior,
    isLoading: isLoadingTotalAnoMesAnterior, refetch: refetchTotalAnoMesAnterior } = useQuery(
      ['vendas-total-mes-ano-passado', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-mes-ano-passado?dataPesquisaInicio=${dataPesquisaAnoAnterior}&dataPesquisaFim=${dataAtualDoAnoPassado}&horaFinal=${hora}`);
        return response.data;
      },
      {
        enabled: Boolean(dataPesquisaAnoAnterior && dataAtualDoAnoPassado && hora), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const dadosTotalMesAtualAnoAnterior = dadosTotalAnoMesAnterior.map((item) => {
    return {
      VALORTOTALMESANOANTERIOR: item.VALORTOTALMES
    }
  })

  const { data: dadosTotalLojaHora = [],
    error: errorTotalLojaHora,
    isLoading: isLoadingTotalLojaHora, refetch: refetchTotalLojaHora } = useQuery(
      ['vendas-total-loja-hora', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-loja-hora?dataPesquisa=${dataPesquisa}&horaFinal=23:59:59`);
        return response.data;
      },
      {
        enabled: Boolean(dataPesquisa && hora), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const dadosTotalLoja = dadosTotalLojaHora.map((item) => {
    const totalVendaDiaAtual = toFloat(item.VALORTOTALDINHEIRO) + toFloat(item.VALORTOTALCARTAO) + toFloat(item.VALORTOTALCONVENIO) + toFloat(item.VALORTOTALPOS)

    return {
      VALORTOTAL: item.VALORTOTAL,
      VALORTOTALPOS: item.VALORTOTALPOS,
      VALORTOTALCARTAO: item.VALORTOTALCARTAO,
      VALORTOTALDINHEIRO: item.VALORTOTALDINHEIRO,
      VALORTOTALCONVENIO: item.VALORTOTALCONVENIO,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      VALORTOTALCREDSYSTEM: item.VALORTOTALCREDSYSTEM,
      totalVendaDiaAtual
    }
  })

  const { data: dadosTotalLojaHoraAnoAnterior = [],
    error: errorTotalLojaHoraAnoAnterior,
    isLoading: isLoadingTotalLojaHoraAnoAnterior, refetch: refetchTotalLojaHoraAnoAnterior } = useQuery(
      ['vendas-total-loja-hora-ano-passado', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-loja-hora-ano-passado?dataPesquisa=${dataAtualDoAnoPassado}&horaFinal=${hora}`);
        return response.data;
      },
      {
        enabled: Boolean(dataAtualDoAnoPassado && hora), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const dadosTotalLojaAnoAnterior = dadosTotalLojaHoraAnoAnterior.map((item) => {
    const totalVendaDiaAtualAnoPassado = toFloat(item.VALORTOTALDINHEIRO) + toFloat(item.VALORTOTALCARTAO) + toFloat(item.VALORTOTALCONVENIO) + toFloat(item.VALORTOTALPOS)

    return {
      VALORTOTAL: item.VALORTOTAL,
      VALORTOTALPOS: item.VALORTOTALPOS,
      VALORTOTALCARTAO: item.VALORTOTALCARTAO,
      VALORTOTALDINHEIRO: item.VALORTOTALDINHEIRO,
      VALORTOTALCONVENIO: item.VALORTOTALCONVENIO,
      VALORTOTALFATURA: item.VALORTOTALFATURA,
      VALORTOTALCREDSYSTEM: item.VALORTOTALCREDSYSTEM,
      totalVendaDiaAtualAnoPassado
    }
  })

  const { data: dadosTotalTesoura = [],
    error: errorTotalTesoura,
    isLoading: isLoadingTotalTesoura, refetch: refetchTesoura } = useQuery(
      ['vendas-total-to', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-to?dataPesquisa=${dataPesquisa}&idGrupo=1`);

        return response.data;
      },
      {
        enabled: true, staleTime: 0, refetchInterval: tempoAtualizacao, refetchIntervalInBackground: true
      }
    );

  const { data: dadosTotalFreecenter = [],
    error: errorTotalFreecenter,
    isLoading: isLoadingTotalFreecenter, refetch: refetchFreecenter } = useQuery(
      ['vendas-total-freecenter', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-freecenter?dataPesquisaFreecenter=${dataPesquisaFreecenter}`);

        return response.data;
      },
      {
        enabled: true, staleTime: 0, refetchInterval: tempoAtualizacao, refetchIntervalInBackground: true
      }
    );

  const { data: dadosTotalMagazine = [], error: errorTotalMagazine,
    isLoading: isLoadingTotalMagazine, refetch: refetchMagazine } = useQuery(
      ['vendas-total-magazine', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-total-magazine?dataPesquisaMagazine=${dataPesquisaMagazine}`);

        return response.data;
      },
      {
        enabled: true, staleTime: 0, refetchInterval: tempoAtualizacao, refetchIntervalInBackground: true
      }
    );



  function devolverDiaSemana(diaSemana) {
    var dias = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    return dias[new Date().getDay()];
  }

  const handleClick = async () => {
    Swal.fire({
      title: 'Atualizando dados...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await Promise.all([
        refetchFreecenter(),
        refetchMagazine(),
        refetchTesoura(),
        refetchTotalMes(),
        refetchTotalAnoMesAnterior(),
        refetchTotalLojaHora(),
        refetchTotalLojaHoraAnoAnterior()
      ]);

      Swal.fire({
        icon: 'success',
        title: 'Dados atualizados!',
        timer: 1000,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar',
        text: 'Tente novamente.',
      });
    }
  };


  const calcularPercentual = (valorAtual, ValorAnterior) => {
    const percentual = ((valorAtual - ValorAnterior) / ValorAnterior) * 100;
    return formatarPorcentagem(percentual)
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between m-3">

        <h1 className="m-0">
          {`GTO Dashboard Vendas do Dia ${devolverDiaSemana()} ${dataFormatada(dataPesquisa)}`}
        </h1>

        <div className="d-flex gap-2">
          <ButtonType
            cor="primary"
            tipo="button"
            outline
            Icon={IoMdRefresh}
            iconColor="primary"
            iconSize={20}
            onClickButtonType={() => handleClick()}
          />
          <ButtonType
            cor="primary"
            tipo="button"
            outline
            Icon={IoIosSettings}
            iconColor="primary"
            iconSize={20}
            onClickButtonType={() => AlterarTempoAtualizacao()}
          />
        </div>

      </div>

      <ResultadoResumo
        cardVendas={true}
        textoMesVendas={`Venda Total Mês - ${dataAno}`}
        porcentoVendas={calcularPercentual(dadosTotalMesAtual[0]?.VALORTOTALMES, dadosTotalMesAtualAnoAnterior[0]?.VALORTOTALMESANOANTERIOR)}
        valorVendas={formatMoeda(toFloat(dadosTotalMesAtual[0]?.VALORTOTALMES))}
        valorVendasAnterior={`${formatMoeda(toFloat(dadosTotalMesAtualAnoAnterior[0]?.VALORTOTALMESANOANTERIOR))} Venda Total Mês - ${dataAnoAnterior}`}
        IconVendas={FaRegMoneyBillAlt}

        cardTotal={true}
        textoMesTotal={`Dinheiro Cartão - POS - Convênio `}
        porcentoTotal={calcularPercentual(dadosTotalLoja[0]?.totalVendaDiaAtual, dadosTotalLojaAnoAnterior[0]?.totalVendaDiaAtualAnoPassado)}
        valorTotal={formatMoeda(toFloat(dadosTotalLoja[0]?.totalVendaDiaAtual))}
        valorTotalAnterior={`${formatMoeda(toFloat(dadosTotalLojaAnoAnterior[0]?.totalVendaDiaAtualAnoPassado))} Dinheiro Cartão - POS - Convênio - ${dataAnoAnterior}`}

        cardPos={true}
        textoMesPos={`POS Hoje - ${dataAno}`}
        porcentoPos={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALPOS, dadosTotalLojaAnoAnterior[0]?.VALORTOTALPOS)}
        valorPos={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALPOS))}
        valorPosAnterior={`${formatMoeda(toFloat(dadosTotalLojaAnoAnterior[0]?.VALORTOTALPOS))} POS - ${dataAnoAnterior}`}
        IconPos={MdOutlinePayment}

        cardCartao={true}
        textoMesCartao={`Cartão Hoje `}
        porcentoCartao={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALCARTAO, dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCARTAO)}
        valorCartao={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALCARTAO))}
        valorCartaoAnterior={`${formatMoeda(toFloat(dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCARTAO))} Cartão - ${dataAnoAnterior}`}
        IconCartao={BsGem}

        cardDinheiro={true}
        textoMesDinheiro={`Dinheiro Hoje - ${dataAno}`}
        porcentoDinheiro={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALDINHEIRO, dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALDINHEIRO)}
        valorDinheiro={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALDINHEIRO))}
        valorDinheiroAnterior={`${formatMoeda(toFloat(dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALDINHEIRO))} Dinheiro - ${dataAnoAnterior}`}
        IconDinheiro={FaCashRegister}

        cardConvenio={true}
        textoMesConvenio={`Convênio Hoje `}
        porcentoConvenio={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALCONVENIO, dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCONVENIO)}
        valorConvenio={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALCONVENIO))}
        valorConvenioAnterior={`${formatMoeda(toFloat(dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCONVENIO))} Convênio - ${dataAnoAnterior}`}
        IconConvenio={FaRegLightbulb}

        cardFatura={true}
        textoMesFatura={`Fatura Hoje `}
        porcentoFatura={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALFATURA, dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALFATURA)}
        valorFatura={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALFATURA))}
        valorFaturaAnterior={`${formatMoeda(toFloat(dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALFATURA))} Fatura - ${dataAnoAnterior}`}
        IconFatura={FaRegLightbulb}

        cardCredsystem={true}
        textoMesCredsystem={`Credsystem - Hoje `}
        porcentoCredsystem={calcularPercentual(dadosTotalLojaHora[0]?.VALORTOTALCREDSYSTEM, dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCREDSYSTEM)}
        valorCredsystem={formatMoeda(toFloat(dadosTotalLojaHora[0]?.VALORTOTALCREDSYSTEM))}
        valorCredsystemAnterior={`${formatMoeda(toFloat(dadosTotalLojaHoraAnoAnterior[0]?.VALORTOTALCREDSYSTEM))} Credsystem - ${dataAnoAnterior}`}
        IconCredsystem={FaRegLightbulb}

        iconSize={100}
        iconColor="white"
      />

      <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">

          <ActionListaVendasTesoura dadosTotalTesoura={dadosTotalTesoura} />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">

          <ActionListaVendasMagazine dadosTotalMagazine={dadosTotalMagazine} />
        </div>

        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">

          <ActionListaVendasFreecenter dadosTotalFreecenter={dadosTotalFreecenter} />
        </div>
      </div>
    </Fragment>
  )
}
import React, { Fragment, useEffect, useState } from "react"
import { formatarMoeda, formatMoeda } from "../../../utils/formatMoeda"
import { toFloat } from "../../../utils/toFloat"
import { ButtonType } from "../../Buttons/ButtonType";
import { getDataAtual, getDataAtualMesAnoAnterior, getDataDiaMesAnoAnterior, getDataPrimeiroDiaMes, getHoraAtual, mesAno, mesAnoAnterior } from "../../../utils/dataAtual"
import { useQuery } from "react-query"
import { get } from "../../../api/funcRequest"
import { ResultadoResumo } from "../../ResumoCards/ResultadoResumo"
import { dataFormatada } from "../../../utils/dataFormatada"
import Swal from 'sweetalert2';
import { IoIosSettings, IoMdRefresh } from "react-icons/io"
import { ActionListaIntegracaoes } from "./actionListaIntegracoes";

export const ActionResumoIntegracoesEnviadas = () => {
  const [dataPesquisa, setDataPesquisa] = useState('')
  const [dataAno, setDataAno] = useState('')
  const [dataAnoAnterior, setDataAnoAnterior] = useState('')
  const [dataPesquisaAnoAnterior, setDataPesquisaAnoAnterior] = useState('')
  const [dataPesquisaInicio, setDataPesquisaInicio] = useState('')
  const [dataPesquisaFim, setDataPesquisaFim] = useState('')
  const [dataPrimeiroDia, setDataPrimeiroDia] = useState('')
  const [dataAtualDoAnoPassado, setDataAtualDoAnoPassado] = useState('')
  const [tempoAtualizacao, setTempoAtualizacao] = useState(60000);
  const [diaSemana, setDiaSemana] = useState('')
  const [hora, setHora] = useState('');

  useEffect(() => {
    const dataAtual = getDataAtual();
    const horaAtual = getHoraAtual();
    const mesAtual = mesAno()
    const primeiroDiaMes = getDataPrimeiroDiaMes();
    setDataPesquisa(dataAtual);
    setDataPesquisaInicio(dataAtual);
    setDataPesquisaFim(dataAtual);
    setDataAno(mesAtual);
    setDataPrimeiroDia(primeiroDiaMes);

    setHora(getHoraAtual());
    const intervalId = setInterval(() => {
      setHora(getHoraAtual());
    }, 5000);

    return () => clearInterval(intervalId);

  }, []);

  const { data: totaisGeraisIntegracoes = [], error: errorTotaisGeraisIntegracoes, isLoading: isTotaisGeraisIntegracoes, refetch: refetchTotaisGeraisIntegracoes } = useQuery(
    ['totais-gerais-integracoes', tempoAtualizacao],
    async () => {
      const response = await get(`/totais-gerais-integracoes?dataPesquisaInicio=${dataPrimeiroDia}&dataPesquisaFim=${dataPesquisaFim}&page=1`);
      return response.data;
    },
    {
      enabled: Boolean(dataPrimeiroDia && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
    }
  );

  const { data: totaisIntegracoesTipo = [], error: errorTotaisIntegracoesTipo, isLoading: isTotaisIntegracoesTipo, refetch: refetchTotaisIntegracoesTipo } = useQuery(
    ['totais-integracoes-por-tipo', tempoAtualizacao],
    async () => {
      const response = await get(`/totais-integracoes-por-tipo?dataPesquisaInicio=${dataPrimeiroDia}&dataPesquisaFim=${dataPesquisaFim}&page=1`);
      return response.data;
    },
    {
      enabled: Boolean(dataPrimeiroDia && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
    }
  );

  const { data: listaIntegracoes = [], error: errorListaIntegracoes, isLoading: isListaIntegracoes, refetch: refetchListaIntegracoes } = useQuery(
    ['lista-integracoes', tempoAtualizacao],
    async () => {
      const response = await get(`/lista-integracoes?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&page=1`);
      return response.data;
    },
    {
      enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
    }
  );

  const formatarNumero = (numero) => {
    return Number(numero).toLocaleString('pt-BR');
  };

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
        refetchTotaisGeraisIntegracoes(),
        refetchTotaisIntegracoesTipo(),
        refetchListaIntegracoes(),
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

  function devolverDiaSemana(diaSemana) {
    var dias = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    return dias[new Date().getDay()];
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between m-3">

        <h1 className="m-0">
          {`GTO Dashboard Integrações Enviadas Para o Mindset ${devolverDiaSemana()} ${dataFormatada(dataPesquisa)}`}
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

        cardVendasContigencia={true}
        textoMesVendasContigencia={`Total Integrações - Mês: ${dataAno}`}
        valorVendasContigencia={formatarNumero(totaisGeraisIntegracoes[0]?.QTDTOTALMES)}
        textoIcone={"Geral"}

        cardVendasContigenciaDia={true}
        textoMesVendasContigenciaDia={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorVendasContigenciaDia={formatarNumero(totaisGeraisIntegracoes[0]?.QTDTOTALDIA)}
        textoIconeDia={"Geral"}

        cardTotalIntegracaoLocation={true}
        textoTotalIntegracaoLocation={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalIntegracaoLocation={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Location'
        )?.QTDTOTALDIA ?? 0))}
        totalIntegracaoLocation={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Location'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalIntegracaoLocation={`Total Integrações - Mês: ${dataAno}`}
        textoIconeTotalIntegracaoLocation={"Location"}

        cardTotalIntegracaoMetric={true}
        textoTotalIntegracaoMetric={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalIntegracaoMetric={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Metric'
        )?.QTDTOTALDIA ?? 0))}
        totalIntegracaoMetric={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Metric'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalIntegracaoMetric={`Total Integrações - Mês: ${dataAno}`}
        textoIconeTotalIntegracaoMetric={"Metric"}

        cardTotalOpenOrder={true}
        textoTotalOpenOrder={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalOpenOrder={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'OpenOrder'
        )?.QTDTOTALDIA ?? 0))}
        totalOpenOrder={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'OpenOrder'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalOpenOrder={`Total Integrações - Mês: ${dataAno}`}
        textoIconeTotalOpenOrder={"openOrder"}

        cardTotalIntegracaoProduct={true}
        textoTotalIntegracaoProduct={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalIntegracaoProduct={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Product'
        )?.QTDTOTALDIA ?? 0))}
        totalIntegracaoProduct={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Product'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalIntegracaoProduct={`Total Vendas Em Contigência - Mês: ${dataAnoAnterior}`}
        textoIconeTotalIntegracaoProduct={"Product"}

        cardTotalIntegracaoProductPrice={true}
        textoTotalIntegracaoProductPrice={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalIntegracaoProductPrice={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'ProductPrice'
        )?.QTDTOTALDIA ?? 0))}
        totalIntegracaoProductPrice={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'ProductPrice'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalIntegracaoProductPrice={`Total Integrações - Mês: ${dataAnoAnterior}`}
        textoIconeTotalIntegracaoProductPrice={"ProductPrice"}

        cardTotalIntegracaoSupplier={true}
        textoTotalIntegracaoSupplier={`Total Integrações - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorTotalIntegracaoSupplier={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Supplier'
        )?.QTDTOTALDIA ?? 0))}
        totalIntegracaoSupplier={formatarNumero(Number(totaisIntegracoesTipo?.find(
          item => item.NOMEAPI === 'Supplier'
        )?.QTDTOTALMES ?? 0))}
        textoSmallTotalIntegracaoSupplier={`Total Integrações - Mês: ${dataAnoAnterior}`}
        textoIconeIntegracaoSupplier={"Supplier"}


        iconSize={100}
        iconColor="white"
      />

      <div >
        <ActionListaIntegracaoes
          listaIntegracoes={listaIntegracoes}
          dataPesquisa={dataPesquisa}

        />
      </div>

    </Fragment>
  )
}
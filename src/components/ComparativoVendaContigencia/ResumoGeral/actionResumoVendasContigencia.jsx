import React, { Fragment, useEffect, useState } from "react"
import { formatMoeda } from "../../../utils/formatMoeda"
import { toFloat } from "../../../utils/toFloat"
import { ButtonType } from "../../Buttons/ButtonType";
import { getDataAtual, getDataAtualMesAnoAnterior, getDataDiaMesAnoAnterior, getDataPrimeiroDiaMes, getHoraAtual, mesAno, mesAnoAnterior } from "../../../utils/dataAtual"
import { useQuery } from "react-query"
import { get } from "../../../api/funcRequest"
import { ResultadoResumo } from "../../ResumoCards/ResultadoResumo"
import { dataFormatada } from "../../../utils/dataFormatada"
import { ActionListaVendasContigenciaDetalhe } from "./actionListaVendasContigencia"
import Swal from 'sweetalert2';
import { IoIosSettings, IoMdRefresh } from "react-icons/io"

export const ActionVendasContigencia = () => {
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

  const { data: vendasContigenciaDetalhes = [],
    error: errorVendasContigenciaDetalhes,
    isLoading: isVendasContigenciaDetalhes, refetch: refetchVendasContigenciaDetalhes } = useQuery(
      ['vendas-contigencia-detalhes', tempoAtualizacao],
      async () => {
        const response = await get(`/lista-venda-contingencia?dataInicio=${dataPesquisaInicio}&dataFim=${dataPesquisaFim}&page=1`);
        return response.data;
      },
      {
        enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const { data: vendasContigenciaDia = [],
    error: errorVendasContigenciaDia,
    isLoading: isVendasContigenciaDia, refetch: refetchVendasContigenciaDia } = useQuery(
      ['vendas-contigencia-dia', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-contigencia-agrupado?dataPesquisaInicio=${dataPesquisaInicio}&dataPesquisaFim=${dataPesquisaFim}&page=1`);
        return response.data;
      },
      {
        enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );

  const { data: vendasContigenciaMes = [],
    error: errorVendasContigenciaMes,
    isLoading: isVendasContigenciaMes, refetch: refetchVendasContigenciaMes } = useQuery(
      ['vendas-contigencia-mes', tempoAtualizacao],
      async () => {
        const response = await get(`/vendas-contigencia-agrupado?dataPesquisaInicio=${dataPrimeiroDia}&dataPesquisaFim=${dataPesquisaFim}&page=1`);
        return response.data;
      },
      {
        enabled: Boolean(dataPesquisaInicio && dataPesquisaFim), staleTime: 0, refetchInterval: tempoAtualizacao
      }
    );


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
        refetchVendasContigenciaDetalhes(),
        refetchVendasContigenciaDia(),
        refetchVendasContigenciaMes(),
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

  const totalContigenciasMes = vendasContigenciaMes.reduce((acc, item) => acc + Number(item.QTDTOTALVENDAS), 0)
  const totalContigenciasDia = vendasContigenciaDia.reduce((acc, item) => acc + Number(item.QTDTOTALVENDAS), 0)

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between m-3">

        <h1 className="m-0">
          {`GTO Dashboard Vendas em Contingência ${devolverDiaSemana()} ${dataFormatada(dataPesquisa)}`}
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
        textoMesVendasContigencia={`Total Vendas Em Contingência - Mês: ${dataAno}`}
        valorVendasContigencia={toFloat(totalContigenciasMes)}
        textoIcone={"Geral"}

        cardVendasContigenciaDia={true}
        textoMesVendasContigenciaDia={`Total Vendas Em Contingência - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorVendasContigenciaDia={toFloat(totalContigenciasDia)}
        textoIconeDia={"Geral"}

        cardVendasContigenciaDF={true}
        textoMesVendasContigenciaDF={`Total Vendas Em Contingência - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorVendasContigenciaDF={Number(vendasContigenciaDia?.find(
          item => item.UF === 'DF'
        )?.QTDTOTALVENDAS ?? 0)}
        totalVendasContigenciaAnteriorDF={Number(vendasContigenciaMes?.find(
          item => item.UF === 'DF'
        )?.QTDTOTALVENDAS ?? 0)}
        textoVendasContigenciaAnteriorDF={`Total Vendas Em Contigência - Mês: ${dataAnoAnterior}`}
        textoIconeDF={"DF"}

        cardVendasContigenciaGO={true}
        textoMesVendasContigenciaGO={`Total Vendas Em Contingência - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorVendasContigenciaGO={Number(vendasContigenciaDia?.find(
          item => item.UF === 'GO'
        )?.QTDTOTALVENDAS ?? 0)}
        totalVendasContigenciaAnteriorGO={Number(vendasContigenciaMes?.find(
          item => item.UF === 'GO'
        )?.QTDTOTALVENDAS ?? 0)}
        textoVendasContigenciaAnteriorGO={`Total Vendas Em Contigência - Mês: ${dataAnoAnterior}`}
        textoIconeGO={"GO"}

        cardVendasContigenciaMG={true}
        textoMesVendasContigenciaMG={`Total Vendas Em Contingência - Hoje: ${devolverDiaSemana()} (${dataFormatada(dataPesquisa)})`}
        valorVendasContigenciaMG={Number(vendasContigenciaDia?.find(
          item => item.UF === 'MG'
        )?.QTDTOTALVENDAS ?? 0)}
        totalVendasContigenciaAnteriorMG={Number(vendasContigenciaMes?.find(
          item => item.UF === 'MG'
        )?.QTDTOTALVENDAS ?? 0)}
        textoVendasContigenciaAnteriorMG={`Total Vendas Em Contigência - Mês: ${dataAnoAnterior}`}
        textoIconeMG={"MG"}

        iconSize={100}
        iconColor="white"
      />

      <div >
        <ActionListaVendasContigenciaDetalhe
          vendasContigenciaDetalhes={vendasContigenciaDetalhes}
          dataPesquisa={dataPesquisa}

        />
      </div>

    </Fragment>
  )
}
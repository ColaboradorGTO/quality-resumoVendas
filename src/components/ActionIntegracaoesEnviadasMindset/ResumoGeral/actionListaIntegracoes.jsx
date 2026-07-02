import React, { Fragment } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toFloat } from "../../../utils/toFloat";
import { dataFormatada, dataHoraFormatada } from "../../../utils/dataFormatada";
import { formatMoeda } from "../../../utils/formatMoeda";
import { useReactToPrint } from "react-to-print";
import HeaderTable from "../../Tables/headerTable"
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useState } from "react";
import { useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import { ButtonHeaderTable } from "../../Buttons/ButtonHeaderTable";
import { ActionDetalheStatus } from "./actionDetalheStatus";
import { get } from "../../../api/funcRequest";
import Swal from "sweetalert2";

export const ActionListaIntegracaoes = ({ listaIntegracoes, dataPesquisa }) => {
  const [rowSelection, setRowSelection] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [modalVisualizarStatus, setModalVisualizarStatus] = useState(false);
  const [detalhesStatus, setDetalhesStatus] = useState(null);

  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Integrações Mindset',

  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['#', 'API', 'Data Inicial', 'Data Fim', 'Total Registros', 'Total Lotes', 'Total Lotes Sucesso', 'Total Lotes Erro', 'Status']],
      body: listaIntegracoes.map(item => [
        item.IDRESUMOINTEGRACAOOTB,
        item.NOMEAPI,
        item.DTHORAINICIO,
        item.DTHORAFIM,
        item.TOTALREGISTROS,
        item.TOTALLOTES,
        item.TOTALLOTESSUCESSO,
        item.TOTALLOTESERRO,
        item.STATUS,

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('integracoes-mindset.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['#', 'API', 'Data Inicio', 'Data Fim ', 'Total Registros', 'Total Lotes', 'Total Lotes Sucesso', 'Total Lotes Erro', 'Status'];
    worksheet['!cols'] = [
      { wpx: 200, caption: '#' },
      { wpx: 100, caption: 'API' },
      { wpx: 100, caption: 'Data Inicio' },
      { wpx: 100, caption: 'Data Fim' },
      { wpx: 100, caption: 'Total Registros' },
      { wpx: 100, caption: 'Total Lotes' },
      { wpx: 100, caption: 'Total Lotes Sucesso' },
      { wpx: 100, caption: 'Total Lotes Erro' },
      { wpx: 100, caption: 'Status' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Integrações Mindset');
    XLSX.writeFile(workbook, 'integracoes-mindset.xlsx');
  };

  const dadosExcel = Array.isArray(listaIntegracoes) ? listaIntegracoes.map((item, index) => {
    let contador = index + 1;

    return {
      IDRESUMOINTEGRACAOOTB: item.IDRESUMOINTEGRACAOOTB,
      NOMEAPI: item.NOMEAPI,
      DTHORAINICIO: item.DTHORAINICIO,
      DTHORAFIM: item.DTHORAFIM,
      TOTALREGISTROS: item.TOTALREGISTROS,
      TOTALLOTES: item.TOTALLOTES,
      TOTALLOTESSUCESSO: item.TOTALLOTESSUCESSO,
      TOTALLOTESERRO: item.TOTALLOTESERRO,
      STATUS: item.STATUS,
      contador: index + 1
    }
  }) : [];

  const dados = listaIntegracoes.map((item, index) => {

    return {
      IDRESUMOINTEGRACAOOTB: item.IDRESUMOINTEGRACAOOTB,
      NOMEAPI: item.NOMEAPI,
      DTHORAINICIO: item.DTHORAINICIO,
      DTHORAFIM: item.DTHORAFIM,
      TOTALREGISTROS: item.TOTALREGISTROS,
      TOTALLOTES: item.TOTALLOTES,
      TOTALLOTESSUCESSO: item.TOTALLOTESSUCESSO,
      TOTALLOTESERRO: item.TOTALLOTESERRO,
      STATUS: item.STATUS,
      contador: index + 1
    }
  });

  const colunas = [
    {
      field: 'Contador',
      header: '#',
      body: row => <th style={{ width: '10px' }}>{row.contador}</th>,

      sortable: true,
    },
    {
      field: 'NOMEAPI',
      header: 'API',
      body: row => <th style={{ width: '180px' }}>{row.NOMEAPI}</th>,

      sortable: true,
    },
    {
      field: 'DTHORAINICIO',
      header: 'Data Inicio',
      body: row => <th style={{ width: '20px' }}>{row.DTHORAINICIO}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFIM',
      header: 'Data Fim',
      body: row => <th>{row.DTHORAFIM}</th>,
      sortable: true,
    },
    {
      field: 'TOTALREGISTROS',
      header: 'Total Registros',
      body: row => <th>{row.TOTALREGISTROS}</th>,
      sortable: true,
    },
    {
      field: 'TOTALLOTES',
      header: 'Total Lotes',
      body: row => <th>{row.TOTALLOTES}</th>,
      sortable: true,
    },
    {
      field: 'TOTALLOTESSUCESSO',
      header: 'Total Lotes Sucesso',
      body: row => <th>{row.TOTALLOTESSUCESSO}</th>,
      sortable: true,
    },
    {
      field: 'TOTALLOTESERRO',
      header: 'Total Lotes Erro',
      body: row => <th>{row.TOTALLOTESERRO}</th>,
      sortable: true,
    },
    {
      field: 'STATUS',
      header: 'Status',
      body: row => <span
        style={{ color: row.STATUS == "CONCLUIDO" ? "green" : "red", fontWeight: "bold", fontSize: "15px" }}>
        {row.STATUS}</span>,
      sortable: true,
    },
    {
      field: 'OPCOES',
      header: 'Opções',
      body: row =>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <ButtonHeaderTable
              titleButton={"Visualizar Status"}
              onClickButtonType={() => handleClickVisualizarStatus(row)}
              Icon={IoIosMenu}
              iconSize={21}
              iconColor={"#fff"}
              cor={"success"}

            />
          </div>
        </div>,
      sortable: true,
    }
  ]

  function devolverDiaSemana(diaSemana) {
    var dias = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    return dias[new Date().getDay()];
  }


  const handleVisualizarStatus = async (IDRESUMOINTEGRACAOOTB) => {
    Swal.fire({
      title: "Carregando status...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await get(
        `/lista-detalhes-integracao?id=${IDRESUMOINTEGRACAOOTB}`
      );

      Swal.close();

      if (response.data) {
        setDetalhesStatus(response.data);
        setModalVisualizarStatus(true);
      }
    } catch (error) {
      Swal.close();

      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível carregar os detalhes.",
      });
    }
  };
  const handleClickVisualizarStatus = (row) => {
    if (row.IDRESUMOINTEGRACAOOTB) {
      handleVisualizarStatus(row.IDRESUMOINTEGRACAOOTB);
    }
  }

  return (
    <Fragment>

      <div className="panel">
        <div className="panel-hdr mb-4">
          <h3>Lista Detalhada de Integrações para o Mindset de Hoje: <b>{devolverDiaSemana()} ({dataFormatada(dataPesquisa)}) </b></h3>
        </div>

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={() => handlePrint(dados.length)}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />
        </div>

        <div className="card" ref={dataTableRef} >
          <DataTable
            title="Lista Detalhada de Vendas em Contingência de Hoje: "
            value={dados}
            size="small"
            rows={10}
            paginator={true}
            selectionMode="single"
            selection={rowSelection}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            filterDisplay="menu"
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunas.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>

        </div>
      </div>

      <ActionDetalheStatus
        show={modalVisualizarStatus}
        handleClose={() => setModalVisualizarStatus(false)}
        detalhesStatus={detalhesStatus}
      />

    </Fragment>
  )

}


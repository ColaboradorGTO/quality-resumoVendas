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

export const ActionListaDetalheStatus = ({ detalhesStatus, dataPesquisa, listaIntegracoes }) => {
  const [rowSelection, setRowSelection] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Detalhes Status',

  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['N° Lote', 'N° Registro inicio', 'N° Registro final', 'Total registros', 'Data Inicio', 'Data Fim', 'N° Tetativas', 'Status', 'Obs']],
      body: detalhesStatus.map(item => [
        item.IDRESUMOINTEGRACAOOTB,
        item.NOMEAPI,
        item.IDDETALHEINTEGRACAOOTB,
        item.DTHORAINICIO,
        item.DTHORAFIM,
        item.NUMEROLOTE,
        item.REGISTROINICIAL,
        item.REGISTROFINAL,
        item.TOTALREGISTROS,
        item.TENTATIVAS,
        item.MSGERROR,

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('detalhes-status.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['N° Lote', 'N° Registro inicio', 'N° Registro final', 'Total registros', 'Data Inicio', 'Data Fim', 'N° Tetativas', 'Status', 'Obs'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'N° Lote' },
      { wpx: 100, caption: 'N° Registro inicio' },
      { wpx: 100, caption: 'N° Registro final' },
      { wpx: 100, caption: 'Total registros' },
      { wpx: 100, caption: 'Data Inicio' },
      { wpx: 100, caption: 'Data Fim' },
      { wpx: 100, caption: 'N° Tetativas' },
      { wpx: 100, caption: 'Status' },
      { wpx: 100, caption: 'Obs' }
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalhes Status');
    XLSX.writeFile(workbook, 'detalhes-status.xlsx');
  };


  const dadosExcel = Array.isArray(detalhesStatus) ? detalhesStatus.map((item, index) => {
    let contador = index + 1;

    return {
      IDRESUMOINTEGRACAOOTB: item.IDRESUMOINTEGRACAOOTB,
      NOMEAPI: item.NOMEAPI,
      IDDETALHEINTEGRACAOOTB: item.IDDETALHEINTEGRACAOOTB,
      DTHORAINICIO: item.DTHORAINICIO,
      DTHORAFIM: item.DTHORAFIM,
      NUMEROLOTE: item.NUMEROLOTE,
      REGISTROINICIAL: item.REGISTROINICIAL,
      REGISTROFINAL: item.REGISTROFINAL,
      TOTALREGISTROS: item.TOTALREGISTROS,
      TENTATIVAS: item.TENTATIVAS,
      STATUS: item.STATUS,
      MSGERROR: item.MSGERROR,
      contador: index + 1
    }
  }) : [];


  const dados = detalhesStatus.map((item, index) => {

    return {
      IDRESUMOINTEGRACAOOTB: item.IDRESUMOINTEGRACAOOTB,
      NOMEAPI: item.NOMEAPI,
      IDDETALHEINTEGRACAOOTB: item.IDDETALHEINTEGRACAOOTB,
      DTHORAINICIO: item.DTHORAINICIO,
      DTHORAFIM: item.DTHORAFIM,
      NUMEROLOTE: item.NUMEROLOTE,
      REGISTROINICIAL: item.REGISTROINICIAL,
      REGISTROFINAL: item.REGISTROFINAL,
      TOTALREGISTROS: item.TOTALREGISTROS,
      TENTATIVAS: item.TENTATIVAS,
      STATUS: item.STATUS,
      MSGERROR: item.MSGERROR,
      contador: index + 1
    }
  });

  const colunas = [
    {
      field: 'NUMEROLOTE',
      header: 'N° Lote',
      body: row => <th style={{ width: '10px' }}>{row.NUMEROLOTE}</th>,

      sortable: true,
    },
    {
      field: 'REGISTROINICIAL',
      header: 'N° Registro Inicio',
      body: row => <th style={{ width: '180px' }}>{row.REGISTROINICIAL}</th>,

      sortable: true,
    },
    {
      field: 'REGISTROFINAL',
      header: 'N° Registro Fim',
      body: row => <th style={{ width: '20px' }}>{row.REGISTROFINAL}</th>,
      sortable: true,
    },
    {
      field: 'TOTALREGISTROS',
      header: 'Total Registros',
      body: row => <th>{row.TOTALREGISTROS}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAINICIO',
      header: 'Data Inicio',
      body: row => <th>{row.DTHORAINICIO}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFIM',
      header: 'Data Fim',
      body: row => <th>{row.DTHORAFIM}</th>,
      sortable: true,
    },
    {
      field: 'TENTATIVAS',
      header: 'N° Tentativas',
      body: row => <th>{row.TENTATIVAS}</th>,
      sortable: true,
    },
    {
      field: 'STATUS',
      header: 'Status',
      body: row => <th style={{ color: row.STATUS == "SUCESSO" ? "green" : "red", fontWeight: "bold", fontSize: "15px" }}>
        {row.STATUS}</th>,
      sortable: true,
    },
    {
      field: 'MSGERROR',
      header: 'Obs',
      body: row => <th style={{ width: '280px' }}>{row.MSGERROR}</th>,
      sortable: true,
    }
  ]

  function devolverDiaSemana(diaSemana) {
    var dias = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    return dias[new Date().getDay()];
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

    </Fragment>
  )

}


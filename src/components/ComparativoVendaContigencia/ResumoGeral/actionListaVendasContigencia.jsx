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


export const ActionListaVendasContigenciaDetalhe = ({ vendasContigenciaDetalhes, dataPesquisa }) => {
  const [rowSelection, setRowSelection] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Adiantamento Salarial das Lojas',

  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Loja', 'UF', 'Marca', 'Data', 'Venda', 'Série', 'NFCE', 'Chave NF', 'Situação', 'Valor', 'Motivo']],
      body: vendasContigenciaDetalhes.map(item => [
        item.NOFANTASIA,
        item.UF,
        item.NOFANTASIA.split(' - ')[1],
        dataHoraFormatada(item.DTHORAFECHAMENTO),
        item.IDVENDA,
        formatMoeda(item.VRTOTALPAGO),
        item.SERIE,
        item.NF,
        item.IDCHAVENFE.split('NFe')[1],
        item.STCONTINGENCIA === 'True' ? 'Contingência' : 'Sem Contingência',
        item.PROTNFE_INFPROT_XMOTIVO,
      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('vendas-contigencia.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    const header = ['Loja', 'UF', 'Marca', 'Data', 'Venda', 'Série', 'NFCE', 'Chave NF', 'Situação', 'Valor', 'Motivo'];
    worksheet['!cols'] = [
      { wpx: 200, caption: 'Loja' },
      { wpx: 100, caption: 'UF' },
      { wpx: 100, caption: 'Marca' },
      { wpx: 100, caption: 'Data' },
      { wpx: 100, caption: 'Venda' },
      { wpx: 100, caption: 'Série' },
      { wpx: 100, caption: 'NFCE' },
      { wpx: 100, caption: 'Chave NF' },
      { wpx: 100, caption: 'Situação' },
      { wpx: 100, caption: 'Valor' },
      { wpx: 100, caption: 'Motivo' },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas Contigencia');
    XLSX.writeFile(workbook, 'vendas-contigencia.xlsx');
  };


  const dadosExcel = Array.isArray(vendasContigenciaDetalhes) ? vendasContigenciaDetalhes.map((item, index) => {
    let contador = index + 1;

    return {
      NOFANTASIA: item.NOFANTASIA,
      UF: item.UF,
      MARCA: item.NOFANTASIA.split(' - ')[1],
      DTHORAFECHAMENTO: dataHoraFormatada(item.DTHORAFECHAMENTO),
      IDVENDA: item.IDVENDA,
      VRTOTALPAGO: formatMoeda(item.VRTOTALPAGO),
      SERIE: item.SERIE,
      NF: item.NF,
      CHAVENFE: item.IDCHAVENFE.split('NFe')[1],
      STCONTINGENCIA: item.STCONTINGENCIA === 'True' ? 'Contingência' : 'Sem Contingência',
      PROTNFE_INFPROT_XMOTIVO: item.PROTNFE_INFPROT_XMOTIVO,
    }
  }) : [];


  const dados = vendasContigenciaDetalhes.map((item, index) => {

    return {
      NOFANTASIA: item.NOFANTASIA,
      UF: item.UF,
      MARCA: item.NOFANTASIA.split(' - ')[1],
      DTHORAFECHAMENTO: dataHoraFormatada(item.DTHORAFECHAMENTO),
      IDVENDA: item.IDVENDA,
      VRTOTALPAGO: formatMoeda(item.VRTOTALPAGO),
      SERIE: item.SERIE,
      NF: item.NF,
      CHAVENFE: item.IDCHAVENFE.split('NFe')[1],
      STCONTINGENCIA: item.STCONTINGENCIA === 'True' ? 'Contingência' : 'Sem Contingência',
      PROTNFE_INFPROT_XMOTIVO: item.PROTNFE_INFPROT_XMOTIVO,
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
      field: 'NOFANTASIA',
      header: 'Loja',
      body: row => <th style={{ width: '180px' }}>{row.NOFANTASIA}</th>,

      sortable: true,
    },
    {
      field: 'UF',
      header: 'UF',
      body: row => <th style={{ width: '20px' }}>{row.UF}</th>,
      sortable: true,
    },
    {
      field: 'MARCA',
      header: 'Marca',
      body: row => <th>{row.MARCA}</th>,
      sortable: true,
    },
    {
      field: 'DTHORAFECHAMENTO',
      header: 'Data',
      body: row => <th>{row.DTHORAFECHAMENTO}</th>,
      sortable: true,
    },
    {
      field: 'IDVENDA',
      header: 'Venda',
      body: row => <th>{row.IDVENDA}</th>,
      sortable: true,
    },
    {
      field: 'SERIE',
      header: 'Série',
      body: row => <th>{row.SERIE}</th>,
      sortable: true,
    },
    {
      field: 'NF',
      header: 'NFCE',
      body: row => <th>{row.NF}</th>,
      sortable: true,
    },
    {
      field: 'CHAVENFE',
      header: 'Chave NF',
      body: row => <th style={{ width: 'px' }}>{row.CHAVENFE}</th>,
      sortable: true,
    },
    {
      field: 'STCONTINGENCIA',
      header: 'Situação',
      body: row => <th>{row.STCONTINGENCIA}</th>,
      sortable: true,
    },
    {
      field: 'VRTOTALPAGO',
      header: 'Valor',
      body: row => <th>{row.VRTOTALPAGO}</th>,
      sortable: true,
    },
    {
      field: 'PROTNFE_INFPROT_XMOTIVO',
      header: 'Motivo',
      body: row => <th style={{ width: '200px' }}>{row.PROTNFE_INFPROT_XMOTIVO}</th>,
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
          <h3>Lista Detalhada de Vendas em Contingência de Hoje: <b>{devolverDiaSemana()} ({dataFormatada(dataPesquisa)}) </b></h3>
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


import React, { Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsGem, BsGlobe } from "react-icons/bs";
import { FaCashRegister, FaRegLightbulb } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export const ResultadoResumo = ({
  cardVendas,
  valorVendas,
  nomeVendas,
  IconVendas,
  textoMesVendas,
  valorVendasAnterior,
  textoMesVendasAnterior,
  porcentoVendas,

  cardTotal,
  valorTotal,
  IconTotal,
  textoMesTotal,
  valorTotalAnterior,
  textoMesTotalAnterior,
  porcentoTotal,

  cardDinheiro,
  valorDinheiro,
  IconDinheiro,
  textoMesDinheiro,
  valorDinheiroAnterior,
  textoMesDinheiroAnterior,
  porcentoDinheiro,

  cardCartao,
  valorCartao,
  IconCartao,
  textoMesCartao,
  valorCartaoAnterior,
  textoMesCartaoAnterior,
  porcentoCartao,

  cardPos,
  valorPos,
  IconPos,
  textoMesPos,
  valorPosAnterior,
  textoMesPosAnterior,
  porcentoPos,

  cardConvenio,
  valorConvenio,
  IconConvenio,
  textoMesConvenio,
  valorConvenioAnterior,
  textoMesConvenioAnterior,
  porcentoConvenio,

  cardFatura,
  valorFatura,
  IconFatura,
  textoMesFatura,
  valorFaturaAnterior,
  textoMesFaturaAnterior,
  porcentoFatura,

  cardCredsystem,
  valorCredsystem,
  IconCredsystem,
  textoMesCredsystem,
  valorCredsystemAnterior,
  textoMesCredsystemAnterior,
  porcentoCredsystem,

  cardVendasContigencia,
  textoMesVendasContigencia,
  porcentoVendasContigencia,
  valorVendasContigenciaAnterior,
  valorVendasContigencia,
  textoMesVendasContigenciaAnterior,
  textoIcone,

  cardVendasContigenciaDia,
  textoMesVendasContigenciaDia,
  porcentoVendasContigenciaDia,
  valorVendasContigenciaAnteriorDia,
  valorVendasContigenciaDia,
  textoMesVendasContigenciaAnteriorDia,
  textoIconeDia,

  cardVendasContigenciaDF,
  textoMesVendasContigenciaDF,
  porcentoVendasContigenciaDF,
  totalVendasContigenciaAnteriorDF,
  valorVendasContigenciaDF,
  textoMesVendasContigenciaAnteriorDF,
  textoIconeDF,
  textoVendasContigenciaAnteriorDF,

  cardVendasContigenciaGO,
  textoMesVendasContigenciaGO,
  porcentoVendasContigenciaGO,
  valorVendasContigenciaAnteriorGO,
  valorVendasContigenciaGO,
  totalVendasContigenciaAnteriorGO,
  textoMesVendasContigenciaAnteriorGO,
  textoIconeGO,
  textoVendasContigenciaAnteriorGO,


  cardVendasContigenciaMG,
  textoMesVendasContigenciaMG,
  porcentoVendasContigenciaMG,
  valorVendasContigenciaAnteriorMG,
  valorVendasContigenciaMG,
  textoMesVendasContigenciaAnteriorMG,
  totalVendasContigenciaAnteriorMG,
  textoVendasContigenciaAnteriorMG,

  cardTotalIntegracaoLocation,
  textoTotalIntegracaoLocation,
  valorTotalIntegracaoLocation,
  totalIntegracaoLocation,
  textoSmallTotalIntegracaoLocation,
  textoIconeTotalIntegracaoLocation,

  cardTotalIntegracaoMetric,
  textoTotalIntegracaoMetric,
  valorTotalIntegracaoMetric,
  totalIntegracaoMetric,
  textoSmallTotalIntegracaoMetric,
  textoIconeTotalIntegracaoMetric,

  cardTotalOpenOrder,
  textoTotalOpenOrder,
  valorTotalOpenOrder,
  totalOpenOrder,
  textoSmallTotalOpenOrder,
  textoIconeTotalOpenOrder,

  cardTotalIntegracaoProduct,
  textoTotalIntegracaoProduct,
  valorTotalIntegracaoProduct,
  totalIntegracaoProduct,
  textoSmallTotalIntegracaoProduct,
  textoIconeTotalIntegracaoProduct,

  cardTotalIntegracaoProductPrice,
  textoTotalIntegracaoProductPrice,
  valorTotalIntegracaoProductPrice,
  totalIntegracaoProductPrice,
  textoSmallTotalIntegracaoProductPrice,
  textoIconeTotalIntegracaoProductPrice,

  cardTotalIntegracaoSupplier,
  textoTotalIntegracaoSupplier,
  valorTotalIntegracaoSupplier,
  totalIntegracaoSupplier,
  textoSmallTotalIntegracaoSupplier,
  textoIconeIntegracaoSupplier,

  textoIconeMG,


  iconSize,
  iconColor
}) => {


  return (
    <Fragment>
      <div className="row">

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardVendas && (
            <div
              className=" bg-info-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesVendas} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoVendas} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorVendas}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 text-warning"> {valorVendasAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesVendasAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconVendas &&
                <IconVendas
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6">
          {cardTotal && (
            <div
              className=" bg-info-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesTotal} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoTotal} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorTotal}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 text-warning"> {valorTotalAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesTotalAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconTotal &&
                <IconTotal
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6">
          {cardPos && (
            <div
              className=" bg-warning-600 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesPos} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoPos} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorPos}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorPosAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesPosAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconPos &&
                <IconPos
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardCartao && (
            <div
              className="bg-warning-600 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesCartao} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoCartao} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorCartao}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorCartaoAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesCartaoAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconCartao &&
                <IconCartao
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardDinheiro && (
            <div
              className=" bg-success-500 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesDinheiro} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoDinheiro} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorDinheiro}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorDinheiroAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesDinheiroAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconDinheiro &&
                <IconVendas
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardConvenio && (
            <div
              className=" bg-success-500 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesConvenio} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoConvenio} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorConvenio}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorConvenioAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesConvenioAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconConvenio &&
                <IconConvenio
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardFatura && (
            <div
              className=" bg-primary-500 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesFatura} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoFatura} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorFatura}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorFaturaAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesFaturaAnterior} </small>
              </div>
              {/* <AiOutlineUser size={100} style={{ fontSize: "8rem" }} class="fa position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1" /> */}
              {IconFatura &&
                <IconFatura
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>


        <div className="col-sm-6 col-lg-4 col-xl-6 col-xl-6" >
          {cardCredsystem && (
            <div
              className=" bg-primary-500 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-0"> {textoMesCredsystem} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoCredsystem} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-0">
                  {valorCredsystem}
                </h2>


              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 "> {valorCredsystemAnterior}</small>
                </h2>
                <small className="position-absolute pos-right pos-top"> {textoMesCredsystemAnterior} </small>
              </div>
              {IconCredsystem &&
                <IconCredsystem
                  className="position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                  size={iconSize}
                  color={iconColor}
                />
              }
            </div>
          )}
        </div>

        <div className="col-sm-4 col-lg-4 col-xl-6 col-xl-6 p-3" >
          {cardVendasContigencia && (
            <div
              className=" bg-primary-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-3"> {textoMesVendasContigencia} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoVendasContigencia} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-3">
                  {valorVendasContigencia}
                </h2>

              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 text-warning"> {valorVendasContigenciaAnterior}</small>
                </h2>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnterior} </small> */}
              </div>
              <div
                className="position-absolute pos-right pos-bottom opacity-75 mr-3 mb-2"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                {textoIcone}
              </div>

            </div>
          )}
        </div>

        <div className="col-sm-4 col-lg-4 col-xl-6 col-xl-6 p-3" >
          {cardVendasContigenciaDia && (
            <div
              className=" bg-primary-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h3 className="fw-500 m-3"> {textoMesVendasContigenciaDia} </h3>
                  <h4 style={{ margin: '0px' }}> {porcentoVendasContigenciaDia} </h4>
                </div>
                <h2 className="display-3 d-inline-block l-h-n m-0 fw-500 m-3">
                  {valorVendasContigenciaDia}
                </h2>

              </div>
              <div className="">
                <h2 style={{ margin: '0px' }} >
                  <small className="position-relative  h5 text-warning"> {valorVendasContigenciaAnteriorDia}</small>
                </h2>
                {/* <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorDia} </small> */}
              </div>

              <div
                className="position-absolute pos-right pos-bottom opacity-75 mr-3 mb-2"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                {textoIconeDia}
              </div>

            </div>

          )}
        </div>


        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardVendasContigenciaDF && (
            <div
              className=" bg-info-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoMesVendasContigenciaDF} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorVendasContigenciaDF}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalVendasContigenciaAnteriorDF}</span>
                  <span className="position-relative  h5 "> {textoVendasContigenciaAnteriorDF}</span>
                </div>
                {/*   <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorDF} </small> */}
              </div>
              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeDF}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardVendasContigenciaGO && (
            <div
              className=" bg-success-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoMesVendasContigenciaGO} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorVendasContigenciaGO}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalVendasContigenciaAnteriorGO}</span>
                  <span className="position-relative  h5 "> {textoVendasContigenciaAnteriorGO}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorGO} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeGO}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardVendasContigenciaMG && (
            <div
              className=" bg-warning-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoMesVendasContigenciaMG} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorVendasContigenciaMG}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalVendasContigenciaAnteriorMG}</span>
                  <span className="position-relative  h5 "> {textoVendasContigenciaAnteriorMG}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorMG} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeMG}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalIntegracaoLocation && (
            <div
              className=" bg-primary-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalIntegracaoLocation} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalIntegracaoLocation}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalIntegracaoLocation}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalIntegracaoLocation}</span>
                </div>
                {/*   <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorDF} </small> */}
              </div>
              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeTotalIntegracaoLocation}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalIntegracaoMetric && (
            <div
              className=" bg-info-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalIntegracaoMetric} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalIntegracaoMetric}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalIntegracaoMetric}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalIntegracaoMetric}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorGO} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeTotalIntegracaoMetric}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalOpenOrder && (
            <div
              className=" bg-success-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalOpenOrder} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalOpenOrder}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalOpenOrder}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalOpenOrder}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorMG} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeTotalOpenOrder}
              </div>

            </div>

          )}
        </div>


        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalIntegracaoProduct && (
            <div
              className=" bg-warning-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalIntegracaoProduct} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalIntegracaoProduct}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalIntegracaoProduct}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalIntegracaoProduct}</span>
                </div>
                {/*   <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorDF} </small> */}
              </div>
              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeTotalIntegracaoProduct}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalIntegracaoProductPrice && (
            <div
              className=" bg-danger-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalIntegracaoProductPrice} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalIntegracaoProductPrice}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalIntegracaoProductPrice}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalIntegracaoProductPrice}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorGO} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeTotalIntegracaoProductPrice}
              </div>

            </div>

          )}
        </div>

        <div className="col-sm-6 col-lg-4 col-xl-4 col-xl-4 p-3" >
          {cardTotalIntegracaoSupplier && (
            <div
              className=" bg-primary-300 rounded overflow-hidden position-relative text-white mb-g"
              style={{ padding: '5px 10px 10px 10px', width: '100%' }}
            >
              <div className="">
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>

                  <h5 className="fw-500 mt-3 mb-3 p-2"> {textoTotalIntegracaoSupplier} </h5>

                </div>
                <h1 className="display-3 d-inline-block l-h-n m-0 fw-500 mt-1 mb-1 p-2">
                  {valorTotalIntegracaoSupplier}
                </h1>

              </div>
              <div className="">
                <div style={{ margin: '0px' }} >
                  <span className="position-relative  h1 ml-2 mr-3">{totalIntegracaoSupplier}</span>
                  <span className="position-relative  h5 "> {textoSmallTotalIntegracaoSupplier}</span>
                </div>
                {/*  <small className="position-absolute pos-right pos-top"> {textoMesVendasContigenciaAnteriorMG} </small> */}
              </div>

              <div
                className="position-absolute opacity-75"
                style={{
                  fontSize: '3rem',
                  fontWeight: 'semibold',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {textoIconeIntegracaoSupplier}
              </div>

            </div>

          )}
        </div>

      </div>
    </Fragment>
  )
}
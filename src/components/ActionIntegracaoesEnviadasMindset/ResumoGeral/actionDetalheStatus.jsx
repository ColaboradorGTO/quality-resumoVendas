import React from "react";
import { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import { HeaderModal } from "../../Modais/HeaderModal/HeaderModal";
import { ActionListaDetalheStatus } from "./actionListaDetalheStatus";
import { FooterModal } from "../../Modais/FooterModal/footerModal";
import { ButtonTypeModal } from "../../Buttons/ButtonTypeModal";

export const ActionDetalheStatus = ({
  show,
  handleClose,
  detalhesStatus
}) => {

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >

        <HeaderModal
          title={`Detalhes da Integração (${detalhesStatus?.[0]?.NOMEAPI})`}
          handleClose={handleClose}
        />

        <Modal.Body>
          <ActionListaDetalheStatus
            detalhesStatus={detalhesStatus}
          />

          <FooterModal
            ButtonTypeFechar={ButtonTypeModal}
            textButtonFechar={"Fechar"}
            onClickButtonFechar={handleClose}
            corFechar="secondary"
          />

        </Modal.Body>

      </Modal>
    </Fragment>
  )
}

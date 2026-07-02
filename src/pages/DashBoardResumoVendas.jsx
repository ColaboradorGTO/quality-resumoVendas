import React, { Fragment, Suspense, lazy, useState } from "react"
import { SidebarProvider } from "../components/Sidebar/SidebarContext";
import { HeaderMain } from "../components/Header";
import { MenuButton } from "../components/Buttons/menuButton";
import { FooterMain } from "../components/Footer";
import { MenuSidebarAdmin } from "../components/Sidebar/sidebar";

const ActionVendasContigencia = lazy(() => import("../components/ComparativoVendaContigencia/ResumoGeral/actionResumoVendasContigencia").then(module => ({ default: module.ActionVendasContigencia })));
const ActionResumoVendas = lazy(() => import("../components/ResumoVendasGerencial/Components/ResumoGeral/actionResumoVendas").then(module => ({ default: module.ActionResumoVendas })));
const ActionResumoIntegracoesEnviadas = lazy(() => import("../components/ActionIntegracaoesEnviadasMindset/ResumoGeral/actionResumoIntegracaosEnviadas").then(module => ({ default: module.ActionResumoIntegracoesEnviadas })));

export const DashBoardResumoVendas = ({ }) => {
  const [componentToShow, setComponentToShow] = useState("");
  const [actionVisivel, setActionVisivel] = useState(true);


  let component = null;

  switch (componentToShow) {
    case "/#":
      component = <ActionResumoVendas />;
      break;
    case "/comparativoVendasContigencia":
      component = <ActionVendasContigencia />;
      break;
    case "/integracoesEnviadasMindset":
      component = <ActionResumoIntegracoesEnviadas />;
      break;
      component = null;
      break;
    default:
  }

  const handleShowComponent = (componentName) => {
    setComponentToShow(componentName);
  };

  return (
    <Fragment>
      <SidebarProvider>

        <div className="page-wrapper">
          <div className="page-inner">
            <MenuSidebarAdmin
              componentToShow={componentToShow}
              handleShowComponent={handleShowComponent}
            />
            <div className="page-content-wrapper">
              {/* <HeaderMain optionsModulosPage={optionsModulosPage} /> */}

              <main id="js-page-content" role="main" className="page-content">
                <div className="row">
                  <div className="col-xl-12">
                    <div id="panel-1" className="panel">
                      <div className="panel-container show">
                        <div className="panel-content">
                          <Suspense fallback={<div>Loading...</div>}>
                            {/*    {!componentToShow && (
                              <ActionResumoVendas />
                            )} */}

                            {actionVisivel && !componentToShow && (<ActionResumoVendas />)}

                            {componentToShow && component}

                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <Fragment>
                <MenuButton />
                <FooterMain />
              </Fragment>
            </div>
          </div>
        </div>
      </SidebarProvider>


      {/*    <SidebarProvider>
             <div className="page-wrapper">
        <div className="page-inner">
          <div className="page-content-wrapper">
            <main id="js-page-content" role="main" className="page-content">
              <div className="row">
                <div className="col-xl-12">
                  <div id="panel-1" className="panel">
                    <div className="panel-container show">
                      <div className="panel-content">
                        <Suspense fallback={<div>Loading...</div>}>
                          <ActionResumoVendas />
                        </Suspense>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div> 
      </SidebarProvider> */}
    </Fragment>
  )
}

import {CSSProperties, useState} from "react";
import {Page, pdfjs, Document} from "react-pdf";
import {useClientStore} from "../../store/Client.store";
import {Button, Modal} from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    maxHeight: "75vh",
    backgroundColor: "#404040",
    paddingBottom: "4px",
    paddingTop: "4px"
}

const ClientModalPdf = ({
                            pdfUrl = "http://localhost:3000/BOLETA.pdf"
                        }) => {
    const [numPages, setNumPages] = useState(null);
    const {openModalPdf, setOpenModalPdf} = useClientStore();


    const onDocumentLoadSuccess = ({numPages}: any) => {
        setNumPages(numPages);
    };
    return (

        <Modal
            title="Visualizador de PDF"
            open={openModalPdf}
            onOk={setOpenModalPdf}
            onCancel={setOpenModalPdf}
            footer={
                [
                    <Button key="submit" type="dashed" onClick={setOpenModalPdf}>
                        Cerrar
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        target="_blank"
                        type="primary"
                        onClick={setOpenModalPdf}
                    >
                        Imprimir
                    </Button>,
                ]
            }
            width={1000}
        >
            < div
                style={pdfContainerStyle}>
                < Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {
                        Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                        ))
                    }
                </Document>
            </div>
        </Modal>
    )
}
export default ClientModalPdf
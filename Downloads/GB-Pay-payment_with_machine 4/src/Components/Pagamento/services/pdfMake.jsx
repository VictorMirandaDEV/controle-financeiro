import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment';

export default function payProofPDF(props){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    function formatCnpjCpf(value)
    {
      const cnpjCpf = value.replace(/\D/g, '');
      
      if (cnpjCpf.length === 11) {
        return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
      } 
      
      return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
    }
    const reportTitle =[
        
    {
        text:"Comprovante de Pagamento GB Pay",
        fontSize:15,
        // bold:true,
        margin:[15,20,0,45]
    }
]
const vencimentoDate = props.vencimento ? moment(props.vencimento).add(1,"days").format("DD/MM/YYYY") : "Não informado";

    const details = [
        {
            image: 'data:image/png;base64,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',
            alignment:"center"
        },

    {text:'Valor',color:'gray', fontSize:16,},
    {text:"R$"+props.originalValue.toFixed(2).toString().replace(".", ",")+"\n" ,bold:true ,lineHeight:1.5, fontSize:16},
    // {text:'Parcelas',color:'gray', fontSize:16,},
    // {text: props.installments >= 2
    // ? `${props.installments}X de R$${(props.value / props.installments)
    //     .toFixed(2)
    //     .toString()
    //     .replace(".", ",")}`
    // : "À Vista"+"\n" ,bold:true ,lineHeight:1.5, fontSize:16},
    {text:'Quem vai receber',color:'gray', fontSize:16, },
    {text:'Nome da empresa',color:'gray', fontSize:12, },
    {text:'GB Pay - Empresa Credenciada pela COSANPA.\n', bold:true ,lineHeight:1.5, fontSize:16},
    {text:'Quem Pagou',color:'gray', fontSize:16 },
    {text:'Nome',color:'gray', fontSize:12, },
    {text:props.name.toUpperCase()+"\n" ,bold:true,lineHeight:1.5, fontSize:16},
    {text:'Data de Pagamento',color:'gray', fontSize:16 },
    {text:moment(props.datePay).format("DD/MM/YYYY [ás] HH:mm:ss")+"\n" ,bold:true,lineHeight:1.5, fontSize:16},
    {text:'Data de Vencimento',color:'gray', fontSize:16 },
    {text:vencimentoDate+"\n" ,bold:true,lineHeight:1.5, fontSize:16},
    {text:'CPF/CNPJ',color:'gray', fontSize:16,},
    {text:formatCnpjCpf(props.document)+"\n",bold:true ,lineHeight:1.5, fontSize:16},
    {text:'Autenticação bancária',color:'gray', fontSize:16,} ,
    {text:props.id+"\n",bold:true ,lineHeight:1.5, fontSize:16},
    // {text:'Comprovante do Cartão',color:'gray', fontSize:16,} ,
    // {text:props.cardProof+"\n",bold:true ,lineHeight:1.5, fontSize:16},
    {text:'Agência/Operação/Conta',color:'gray', fontSize:16,} ,
    {text:props.convenant+"\n",bold:true ,lineHeight:1.5, fontSize:16},
    // {text:props.nsu&& 'NSU',color:'gray', fontSize:16,}, 
    // {text:props.nsu&& props.nsu+"\n",bold:true ,lineHeight:1.5, fontSize:16},
    {text:'Linha digitavél',color:'gray', fontSize:16,} ,
    {text:props.boleto,bold:true ,lineHeight:1.5, fontSize:15},
   
]



    const rodape = (currentPage, pageCount) =>{
        return [
            {
                text:currentPage + ' / ' + pageCount,
                alignment:"right",
                fontSize:9,
                margin:[0,10,20,0]
            }
        ]
    } 

    const docDefinitions ={
        pageSize: "A4",
        pageMargins: [100,50,70,40],

        header: [reportTitle],
        content: [details],
        footer:rodape


    }
    pdfMake.createPdf(docDefinitions).download("comprovante de pagamento");
}
export const formatCPFCNPJ =(document)=>document
.replaceAll(".", "")
.replaceAll("-", "")
.replaceAll("/", "");

export const formatName = (data) => {
    let firstName = data.split(" ").slice(0, -1).join(" ");
    let lastName = data.split(" ").slice(-1).join(" ");

    return [firstName,lastName]
}


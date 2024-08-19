import DownloadPagamentoClient from "./client";
import { headers } from "next/headers";

const getAllLogs = async () => {
    const host = headers().get('host');
    const protocol = host=='localhost:3000'?'http':'https';
    const response = await fetch(`${protocol}://${host}/api/payment?take=1000000`)
    .then((res) => res.json())
    return response;
}

export default async function LogDownload () {
    const data = await getAllLogs();
    return (
        <DownloadPagamentoClient data={data}/>
    )
}

import DownloadLogClient from "./client";
import { headers } from "next/headers";

const getAllLogs = async () => {
    const host = headers().get('host');
    const protocol = headers().get('x-forwarded-proto');
    const response = await fetch(`${protocol}://${host}/api/logs?take=1000000`)
    .then((res) => res.json())
    return response;
}

export default async function LogDownload () {
    const data = await getAllLogs();
    return (
        <DownloadLogClient data={data}/>
    )
}

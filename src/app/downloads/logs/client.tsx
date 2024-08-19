'use client';

import { CSVDownload } from "react-csv";

export default function DownloadLogClient(props:any) {
    const { data } = props;
    return (
        <>
        <CSVDownload data={data.data} target='_blank'/>
        </>
  );
}

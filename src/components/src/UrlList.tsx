import { DataTable } from "../ui/data-table";
import { columns } from "./UrlColumns";
import { urlDoc } from "@/pages/index.tsx";

function UrlList({URLs}: {URLs: urlDoc[]}) {
    return (
		<div className="md:w-3/4 w-full mt-4 md:px-0 px-4">
			<DataTable columns={columns} data={URLs} />
		</div>
	);
    
}

export default UrlList;
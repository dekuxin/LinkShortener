import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Button } from "../ui/button";

function AlertSuccess({url}: {url: string}) {
	return (
		<div className="w-full md:w-3/4 px-4 mt-4 md:px-0">
			<Alert>
				<Terminal className="h-4 w-4" />
				<AlertTitle>Success</AlertTitle>
				<AlertDescription className="flex gap-3 items-center w-full justify-between">
					<p className="flex flex-col max-w-[75%]">
						<span>Here is your shortened link: </span>
						<span className="font-bold" style={{wordWrap: 'break-word'}} >{url}</span>
					</p>
					<Button onClick={() => navigator.clipboard.writeText(url)} className="text-center">
						<p>Copy</p>
					</Button>
				</AlertDescription>
			</Alert>
		</div>
	);
}

export default AlertSuccess;

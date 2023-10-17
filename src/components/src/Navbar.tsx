import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import {FiLogOut} from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { login, logout } from "@/lib/login";

function Pfp({ src, name }: { src: string; name: string }) {
	return (
		<div className="flex gap-2 items-center">
			<Avatar>
				<AvatarImage title="Google Profile Picture" src={src} alt="Profile Picture" />
				<AvatarFallback>{name}</AvatarFallback>
			</Avatar>
			<Button title="logout" onClick={logout} size={'sm'} variant={'destructive'}>
				<FiLogOut />
			</Button>
		</div>
	);
}

type userProp = {
	src: string | null;
	name: string | null;
};

function Navbar({ src, name }: userProp) {
	return (
		<header className="flex justify-between md:w-5/6 w-full md:px-0 px-5 py-5 mx-auto items-center">
			<div className="text-3xl font-bold text-primary">URL Shortener</div>
			{/** Menu > md */}
			<ul className="md:flex hidden items-center justify-center gap-4 space-x-2">
				<li>
					<Button onClick={() => window.scrollTo({ top: 0 })}>
						Shorten URL
					</Button>
				</li>
				<li>
					{src && name ? (
						<Pfp src={src} name={name} />
					) : (
						<a
							href="#"
							onClick={login}
							className="text-primary bg-primary-foreground">
							Login
						</a>
					)}
				</li>
			</ul>
			{/** Menu < md */}
			<Sheet>
				<SheetTrigger className="md:hidden">
					<IoMenu className="text-3xl" />
				</SheetTrigger>
				<SheetContent>
					<ul className="flex flex-col items-center justify-center gap-4 h-full">
						<li>
							{src && name ? (
								<Pfp src={src} name={name} />
							) : (
								<a
									href="#"
									className="text-primary bg-primary-foreground">
									Login
								</a>
							)}
						</li>
						<li>
							<SheetClose>
								<Button
									onClick={() => window.scrollTo({ top: 0 })}>
									Shorten URL
								</Button>
							</SheetClose>
						</li>
					</ul>
				</SheetContent>
			</Sheet>
		</header>
	);
}

export default Navbar;

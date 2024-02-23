import Logo from '@/components/icons/Logo';
import { author } from '@/data/author';

export default function Index() {
    const { name, username, github: urlGithub } = author;

    return (
        <header className="h-[10vh] flex items-center justify-between px-4">
            <a
                href={urlGithub}
                target="_blank"
                className="flex gap-4 justify-center items-center cursor-pointer"
                title={name}
            >
                <Logo className="w-8 fill-logo-color animate-spin-logo" />
                <h2 className="font-space-grotesk font-bold text-2xl text-bold">{username}</h2>
            </a>
        </header>
    );
}

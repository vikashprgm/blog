import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component : indexpage,
})

function indexpage(){
    return(
        <div>
            Hi
        </div>
    )
}
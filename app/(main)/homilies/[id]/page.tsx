import HomilyEditorClient from "./homily-editor-client"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CreateHomilyPage({ params }: PageProps) {
  const { id } = await params
  
  return <HomilyEditorClient homilyId={id} />
}

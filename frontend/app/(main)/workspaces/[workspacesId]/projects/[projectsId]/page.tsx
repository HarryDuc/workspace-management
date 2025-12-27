type Props = {
  params: {
    projectsId: string;
  };
};

export default async function ProjectsIdApp(props: Props) {
  const { projectsId } = await props.params;
  return (
    <div>{projectsId}</div>
  )
}
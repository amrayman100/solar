function getProposal() {}

export default function ViewProposal({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}

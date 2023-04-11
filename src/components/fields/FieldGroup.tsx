export type FieldGroupProps = {
  children: React.ReactNode;
};

export default function FieldGroup({ children }: FieldGroupProps) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}

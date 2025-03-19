interface UserCardProps {
  image: string;
  name: string;
  email: string;
  role: string;
  energySaved: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  email,
  role,
  energySaved,
}) => {
  return (
    <article className="flex flex-col px-3 pt-6 pb-3 w-full font-medium text-black bg-amber-50 rounded-xl">
      <div className="flex gap-1.5 self-start">
        <img
          src='https://cdn.builder.io/api/v1/image/assets/e97f4b049aa04c0fb59c904d1d337327/141d624aa64764dbd3b4950c64b8a5532929dede97a67787f0eb1b370f9b25c8'
          alt={name}
          className="object-contain shrink-0 max-w-full rounded-full aspect-square w-[120px]"
        />
        <div className="flex flex-col items-start self-start mt-2">
          <h3 className="text-base font-semibold">{name || "Invited"}</h3>
          <p className="self-stretch mt-2.5 text-sm">{email}</p>
          <p className="mt-1.5 text-xs">{role}</p>
        </div>
      </div>

      {/* Conditionally render energy saved or status */}
      {name ? (
        <p className="self-end mt-1.5 text-sm">
          Energy Saved: <span className="font-bold">{energySaved}</span>
        </p>
      ) : (
        <p className="self-end mt-1.5 text-sm text-red-500">Status: Invited</p>
      )}
    </article>
  );
};

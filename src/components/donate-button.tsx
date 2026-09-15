import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { org } from "@/lib/content";

export function DonateButton({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  if (org.donate) {
    return (
      <Button asChild variant="primary" size={size} className={className}>
        <a href={org.donate} target="_blank" rel="noreferrer">
          Donate
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant="primary" size={size} className={className}>
      <Link to="/act" hash="donate">
        Donate
      </Link>
    </Button>
  );
}

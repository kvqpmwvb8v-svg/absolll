import { Container } from "./Container";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";
import { Link } from "./Link";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href: string; variant?: "primary" | "secondary" | "ghost" };
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className = "" }: EmptyStateProps) {
  return (
    <Container size="sm" className={`py-16 md:py-24 text-center ${className}`}>
      {icon && (
        <div className="mb-6 text-text-muted">
          {icon}
        </div>
      )}
      <Heading as="h2" size="h2" weight="medium" className="mb-3">
        {title}
      </Heading>
      {description && (
        <Text color="muted" size="lg" leading="relaxed" className="mb-6 max-w-md mx-auto">
          {description}
        </Text>
      )}
      {action && (
        <Button variant={action.variant || "primary"}>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </Container>
  );
}
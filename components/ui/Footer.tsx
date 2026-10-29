import { Container } from "./Container";
import { Link as LinkComponent } from "./Link";
import { Divider } from "./Divider";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`border-t border-border bg-bg-primary ${className}`} role="contentinfo">
      <Container size="md">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl font-display font-bold tracking-tight text-text-primary mb-4">
                ABSOLUTI
              </h3>
              <p className="text-text-muted leading-relaxed max-w-xs">
                Исторический клуб, объединяющий исследователей, энтузиастов и всех, кто ценит истинную историю.
              </p>
            </div>

            <nav aria-label="Навигация по сайту">
              <h4 className="text-sm font-medium text-text-primary uppercase tracking-wider mb-4">
                Разделы
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Главное" },
                  { href: "/about", label: "О клубе" },
                  { href: "/events", label: "Расписание" },
                  { href: "/news", label: "Новости" },
                  { href: "/photos", label: "Фото" },
                ].map((item) => (
                  <li key={item.href}>
                    <LinkComponent href={item.href} variant="muted" underline="hover">
                      {item.label}
                    </LinkComponent>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="text-sm font-medium text-text-primary uppercase tracking-wider mb-4">
                Контакты
              </h4>
              <address className="text-text-muted leading-relaxed not-italic">
                <p>Москва, Россия</p>
                <p className="mt-2">
                  <a href="mailto:info@absoluti.club" className="text-accent hover:underline">info@absoluti.club</a>
                </p>
              </address>
            </div>
          </div>

          <Divider className="my-8 md:my-12" variant="subtle" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-text-subtle text-sm">
              © {new Date().getFullYear()} ABSOLUTI. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <LinkComponent href="/privacy" variant="muted" size="sm" underline="hover">
                Политика конфиденциальности
              </LinkComponent>
              <LinkComponent href="/terms" variant="muted" size="sm" underline="hover">
                Условия использования
              </LinkComponent>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
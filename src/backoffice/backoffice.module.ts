import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin'
import { UserAdmin } from 'src/user/user.admin';
import { IdentityAdmin } from 'src/identity/identity.admin';

export class BackofficeModule extends DefaultAdminModule {
  constructor(private readonly a: DefaultAdminSite) {
    super(a)
    this.a.register('Utilisateurs', UserAdmin)
    this.a.register('Identités utilisateurs', IdentityAdmin)
  }
}

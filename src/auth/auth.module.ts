import { Module }
from '@nestjs/common';

import { TypeOrmModule }
from '@nestjs/typeorm';

import { JwtModule }
from '@nestjs/jwt';

import { PassportModule }
from '@nestjs/passport';

import { AuthService }
from './auth.service';

import { AuthController }
from './auth.controller';

import { JwtStrategy }
from './jwt.strategy';

import { Etudiant }
from '../etudiant/entities/etudiant.entity';

import { Enseignant }
from '../enseignant/entities/enseignant.entity';
import { Admin }
from '../admin/entities/admin.entity';

@Module({

  imports: [

    TypeOrmModule.forFeature([
  Etudiant,
  Enseignant,
  Admin,
]),

    PassportModule,

    JwtModule.register({

      secret:
          'SECRET_JWT_UNIVERSITE',

      signOptions: {

        expiresIn: '1d',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [

    AuthService,

    JwtStrategy,
  ],
})

export class AuthModule {}
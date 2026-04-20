<?php
require __DIR__.'/vendor/autoload.php';

use App\Kernel;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Console\Application;

$kernel = new Kernel('dev', true);
$kernel->boot();

$container = $kernel->getContainer();
$em = $container->get('doctrine')->getManager();
$hasher = $container->get('security.user_password_hasher');

$user = $em->getRepository(User::class)->findOneBy(['email' => 'test2@test.com']);
if (!$user) {
    echo "User NOT FOUND\n";
    exit(1);
}

echo "Found user: " . $user->getEmail() . "\n";
echo "Hashed password in DB: " . $user->getPassword() . "\n";

$isValid = $hasher->isPasswordValid($user, '123456');
echo "Is password '123456' valid? " . ($isValid ? 'YES' : 'NO') . "\n";

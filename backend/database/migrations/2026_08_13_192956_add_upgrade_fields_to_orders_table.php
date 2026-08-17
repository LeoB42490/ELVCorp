<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('type')
                ->default('purchase')
                ->after('status');

            $table->foreignId('instance_id')
                ->nullable()
                ->after('type')
                ->constrained('instances')
                ->nullOnDelete();

            $table->foreignId('source_application_offer_id')
                ->nullable()
                ->after('instance_id')
                ->constrained('application_offers')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['source_application_offer_id']);
            $table->dropForeign(['instance_id']);

            $table->dropColumn([
                'source_application_offer_id',
                'instance_id',
                'type',
            ]);
        });
    }
};